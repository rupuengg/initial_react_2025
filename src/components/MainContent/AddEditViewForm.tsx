import { faEdit, faRefresh, faSave, faXmark } from '@fortawesome/free-solid-svg-icons';
import { IBaseForm } from 'forms';
import { RenderForm } from 'forms/RenderForm';
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CommonEntity } from 'entities';
import { E_Data_Save_Status, E_Form_Type, E_Operation_Permission } from 'enums';
import { useANAModulePermission, useTableMapper } from 'hooks';
import { UrlUtils } from 'utils';
import { IApplicationState, IOptions, IUseDispatch, saveData, updateData, useAppDispatch } from 'store';
import { EntityDataActions } from 'store/slices/entityDataSlice';
import { Breadcrumb, FontIcon } from 'components';

export function mapFormWithValues(form: IBaseForm[] | undefined, entity: CommonEntity): IBaseForm[] | undefined {
  const cb = (frm: IBaseForm): IBaseForm => {
    const newFrm: IBaseForm = { ...frm };

    if (newFrm.type === E_Form_Type.FIELD && newFrm.fieldName && entity[newFrm.fieldName as keyof CommonEntity]) newFrm.fieldValue = entity[newFrm.fieldName as keyof CommonEntity] as keyof unknown;

    if (newFrm.type === E_Form_Type.COLUMN) newFrm.rows = newFrm.rows?.map(r => ({ ...r, ...cb(r) }));
    else if (newFrm.type === E_Form_Type.ROW) newFrm.fields = newFrm.fields?.map(f => ({ ...f, ...cb(f) }));

    return newFrm;
  };

  return form?.map(f => cb(f));
}

interface IAddEditView {
  isAdd: boolean;
  isEditable: boolean;
  isRead: boolean;
}

function getPermission(type: E_Operation_Permission): IAddEditView {
  const permission: IAddEditView = { isAdd: false, isEditable: false, isRead: false };

  switch (type) {
    case E_Operation_Permission.VIEW:
      permission.isRead = true;
      permission.isEditable = true;
      permission.isAdd = false;
      break;
    case E_Operation_Permission.ADD:
    case E_Operation_Permission.COPY:
      permission.isRead = false;
      permission.isEditable = false;
      permission.isAdd = true;
      break;
    case E_Operation_Permission.EDIT:
      permission.isRead = false;
      permission.isEditable = true;
      permission.isAdd = false;
      break;
  }

  return permission;
}

interface IAddEditViewForm {
  type: E_Operation_Permission;
}

export const AddEditViewForm: React.FC<IAddEditViewForm> = ({ type }) => {
  const { global, entityData } = useSelector((state: IApplicationState) => state);
  const dispatch: IUseDispatch = useAppDispatch();
  const { entrypoint, mainNavTitle, mfeSupTitle, mfeTitle } = global;
  const { mapper, entityForm, defaultEntity } = useTableMapper(entrypoint);
  const { allowCreate, allowUpdate } = useANAModulePermission(mapper.permission);
  const { isAdd, isEditable, isRead } = getPermission(type);
  const [item, setItem] = useState<CommonEntity | undefined>();
  const [initialItem, setInitialItem] = useState<CommonEntity | undefined>();
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const refSave = useRef(0);

  const dp = useMemo(() => {
    if (params.other && entityData.items && entityData.items[params.other] && entityData.items[params.other].dp) return entityData.items[params.other].dp;
  }, [params.other, entityData.items]);

  const dataSaveStatus = useMemo(() => {
    if (params.other && entityData.items && entityData.items[params.other] && entityData.items[params.other].dataSaveStatus) return entityData.items[params.other].dataSaveStatus?.dataSaveStatus;
    return null;
  }, [params.other, entityData.items]);

  useEffect(() => {
    if (params.other && dataSaveStatus) {
      if (dataSaveStatus === E_Data_Save_Status.SAVE_INITIALIZE) refSave.current++;
      if (dataSaveStatus === E_Data_Save_Status.SAVE_DONE && refSave.current === 1) {
        dispatch(EntityDataActions.dataSaveStatusStart({ entrypoint: entrypoint }));
        refSave.current = 0;
        navigate({
          pathname: UrlUtils.makeRouteWidthoutSearch('admin', params.other),
          search: `?${searchParams.toString()}`,
        });
      }
    }
  }, [entrypoint, entityData, params.other, dispatch, searchParams, dataSaveStatus, navigate]);

  // Set item by ID
  useEffect(() => {
    if (params.dataId && params.other && entityData.items[params.other]) {
      setItem(entityData.items[params.other].list.find(i => i.id?.toString() === params.dataId));
      setInitialItem(entityData.items[params.other].list.find(i => i.id?.toString() === params.dataId));
    } else {
      if (defaultEntity) {
        setItem(defaultEntity);
        setInitialItem(defaultEntity);
      }
    }
  }, [type, params.other, params.dataId, entityData, defaultEntity]);

  const dropdownUpdater = useCallback(
    (fieldName: string, options: IOptions[]) => {
      dispatch(EntityDataActions.setDropDownOptions({ entrypoint: entrypoint, fieldName, options }));
    },
    [entrypoint, dispatch]
  );

  // Map item with form
  const form = useMemo(() => {
    // if (item && entityForm) return mapFormWithValues(entityForm, item);
    if (entityForm) return entityForm;
    return null;
  }, [entityForm]);

  const handleChange = useCallback((fieldName: string, fieldValue: string | number | string[] | undefined | null, otherValue?: any) => {
    setItem((p: CommonEntity | undefined) => {
      if (!p) return undefined;

      let previousData: any = { ...p };

      if (fieldName === 'ogImageUrl') {
        previousData = { ...previousData, ...{ ogImageType: otherValue.mime, ogImageWidth: otherValue.width, ogImageHeight: otherValue.height }, [fieldName]: fieldValue };
      } else if (fieldName === 'items' && otherValue) {
        previousData = { ...previousData, [fieldName]: JSON.stringify(otherValue) };
      } else {
        previousData = { ...previousData, [fieldName]: fieldValue };
      }

      return {
        ...previousData,
        // ...(fieldName === 'ogImageUrl' ? { ogImageType: otherValue.mime, ogImageWidth: otherValue.width, ogImageHeight: otherValue.height } : {}),
        // ...(fieldName === 'items' ? { ogImageType: otherValue.mime, ogImageWidth: otherValue.width, ogImageHeight: otherValue.height } : {}),
        // [fieldName]: fieldValue,
      };
    });
  }, []);

  const isFormChanged = useMemo(() => !_.isEqual(item, initialItem), [item, initialItem]);

  // useEffect(() => {
  //   if (isAdd || (isEditable && !isRead)) {
  //     const inputMask: any = document.querySelectorAll('.form-layouts input');
  //     if (inputMask.length >= 0 && inputMask[0].focus) {
  //       inputMask[0].focus();
  //     }
  //   }
  // }, [isAdd, isRead, isEditable]);

  // useEffect(() => {
  //   isSave && Validation(isAdd ? createBlockValidationSchema : updateBlockValidationSchema).ValidateFormOnly(yardBlock, setErrors);
  // }, [isAdd, yardBlock, isSave]);

  // const saveButtonClicked = useCallback(
  //   async () => {
  //     setIsSave(true);
  //     Validation(isAdd ? createBlockValidationSchema : updateBlockValidationSchema).ValidateForm(yardBlock, setErrors, () => {
  //       i`f (yardBlock.blockStacks && yardBlock.blockStacks.length === 0) {
  //         onShowNotification(false, YardBlockConstants.YARD_BLOCK.LABEL.MANDATORY_STACK_MESSAGE);
  //       } else {
  //         if (yardBlock.key) {
  //           saveYardBlock && saveYardBlock(yardBlock);
  //         } else
  //           createYardBlockData &&
  //             createYardBlockData({
  //               ...yardBlock,
  //               versionIdentifier: {
  //                 version: 'NEW',
  //               },
  //             });
  //         const element = document.querySelector('#selectedData') as HTMLElement;
  //         const dragDropData = element?.innerText?.split('\n');
  //         const mergeBlockList = dragDropData?.map((item, i) => {
  //           return { mergeBlockSequence: i + 1, blockId: item };
  //         });
  //         const updatedMergedBlock: MergedBlockEntity = { ...mergedBlock!, mergeBlockList: mergedBlock?.mergedBlock ? mergeBlockList : [] };
  //         saveMergedBlock && saveMergedBlock(updatedMergedBlock!);
  //         setIsSave(false);
  //       }
  //     });
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [yardBlock, saveYardBlock, mergedBlock, saveMergedBlock]
  // );

  const getTitle = useMemo(() => {
    const parentTitle = mainNavTitle?.length ? mainNavTitle : mfeSupTitle;
    const titles: { title: string }[] = parentTitle ? parentTitle.map((item: any) => ({ title: item })) : [];
    titles.push({ title: mfeTitle || '' });

    if (type === E_Operation_Permission.ADD || type === E_Operation_Permission.COPY) titles.push({ title: 'Add' });
    else {
      titles.push({ title: 'View' });
      if (type === E_Operation_Permission.EDIT) titles.push({ title: 'Edit' });
    }

    return titles;
  }, [type, mainNavTitle, mfeSupTitle, mfeTitle]);

  const handleEdit = useCallback(() => {
    navigate({
      pathname: UrlUtils.makeRouteWidthoutSearch('admin', params.other, E_Operation_Permission.EDIT, params.dataId),
      search: `?${searchParams.toString()}`,
    });
  }, [params.other, params.dataId, searchParams, navigate]);

  const handleClose = useCallback(() => {
    if (type === E_Operation_Permission.EDIT) {
      navigate({
        pathname: UrlUtils.makeRouteWidthoutSearch('admin', params.other, E_Operation_Permission.VIEW, params.dataId),
        search: `?${searchParams.toString()}`,
      });
    } else {
      navigate({
        pathname: UrlUtils.makeRouteWidthoutSearch('admin', params.other),
        search: `?${searchParams.toString()}`,
      });
    }
  }, [type, params.other, params.dataId, searchParams, navigate]);

  const handleReset = useCallback(() => {
    setItem(initialItem);
  }, [initialItem]);

  const handleSave = useCallback(() => {
    dispatch(EntityDataActions.dataSaveStatusStart({ entrypoint: entrypoint }));
    if (type === E_Operation_Permission.EDIT) {
      dispatch(updateData({ ...mapper, data: { ...item } }));
    } else {
      dispatch(saveData({ ...mapper, data: { ...item, id: 0 } }));
    }
  }, [type, entrypoint, mapper, item, dispatch]);

  return (
    <div className='main-box' style={{ width: '100%', border: 'none', backgroundColor: '#FFFFFF', overflow: 'auto', padding: '0' }}>
      <div className='header-bar' style={{ width: '100%', alignItems: 'center' }}>
        <Breadcrumb data={getTitle} />

        <div className='action'>
          {!isAdd && isEditable && isRead && (
            <>
              {/* Edit Button */}
              <FontIcon icon={faEdit} onClick={handleEdit} />
              {/* Close Button */}
              <FontIcon icon={faXmark} onClick={handleClose} />
            </>
          )}
          {(isAdd || (isEditable && !isRead)) && (
            <>
              {/* Reset Form Button */}
              <FontIcon icon={faRefresh} isDisabled={!isFormChanged} onClick={handleReset} />
              {/* Close Button */}
              <FontIcon icon={faXmark} onClick={handleClose} />
              {/* Save Button */}
              {((isAdd && allowCreate) || (isEditable && allowUpdate)) && <FontIcon icon={faSave} isDisabled={!isFormChanged} onClick={handleSave} />}
            </>
          )}
        </div>
      </div>

      {/* Readable and Editable Form */}
      <div className={'form-layouts'} id='block-add-edit-form'>
        {/* If user add new record */}
        {/* {isAdd && <div className='title'>{`NEW ${mfeTitle?.toUpperCase()}`}</div>} */}

        {/* If user edit existing record */}
        {/* {isEditable && <div className='title'>{params.dataId}</div>} */}

        {/* {(isAdd || (isEditable && !isRead)) && <p>Form Remark</p>} */}

        <RenderForm form={form} entity={item} dp={dp} dropdownUpdater={dropdownUpdater} isReadable={isRead} onChange={handleChange} />
      </div>
    </div>
  );
};
