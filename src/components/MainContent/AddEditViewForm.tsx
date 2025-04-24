import { faEdit, faRefresh, faSave, faXmark } from '@fortawesome/free-solid-svg-icons';
import { IBaseForm } from 'forms';
import { RenderForm } from 'forms/RenderForm';
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CommonEntity } from 'entities';
import { E_Form_Type, E_Operation_Permission } from 'enums';
import { useANAModulePermission, useTableMapper } from 'hooks';
import { UrlUtils } from 'utils';
import { IApplicationState, IUseDispatch, saveData, updateData, useAppDispatch } from 'store';
import { Breadcrumb, FontIcon } from 'components';

export function mapFormWithValues(form: IBaseForm[] | undefined, entity: CommonEntity): IBaseForm[] | undefined {
  const cb = (frm: IBaseForm): IBaseForm => {
    const newFrm: IBaseForm = { ...frm };

    if (newFrm.type === E_Form_Type.FIELD && newFrm.fieldName && entity[newFrm.fieldName as keyof CommonEntity])
      newFrm.fieldValue = entity[newFrm.fieldName as keyof CommonEntity] as keyof CommonEntity;

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

  // Map item with form
  const form = useMemo(() => {
    if (item && entityForm) return mapFormWithValues(entityForm, item);
    return null;
  }, [item, entityForm]);

  const handleChange = useCallback(
    (fieldName: string, fieldValue: string | number | string[] | undefined | null, otherValue?: any) => {
      setItem((p: CommonEntity | undefined) => {
        if (!p) return undefined;
        return {
          ...p,
          ...(fieldName === 'ogImageUrl' ? { ogImageType: otherValue.mime, ogImageWidth: otherValue.width, ogImageHeight: otherValue.height } : {}),
          [fieldName]: fieldValue,
        };
      });
    },
    [entrypoint, item]
  );

  const isSaveEnable = useMemo(() => _.isEqual(item, initialItem), [item, initialItem]);

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
  }, []);

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
  }, [type]);

  const handleReset = useCallback(() => {
    setItem(initialItem);
  }, [initialItem]);

  const handleSave = useCallback(() => {
    if (type === E_Operation_Permission.EDIT) {
      dispatch(updateData({ ...mapper, data: { ...item } }));
    } else {
      dispatch(saveData({ ...mapper, data: { ...item, id: 0 } }));
    }
    // navigate({
    //   pathname: UrlUtils.makeRouteWidthoutSearch('admin', params.other),
    //   search: `?${searchParams.toString()}`,
    // });
  }, [type, mapper, item]);

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
              <FontIcon icon={faRefresh} disabled={isSaveEnable} onClick={handleReset} />
              {/* Close Button */}
              <FontIcon icon={faXmark} onClick={handleClose} />
              {/* Save Button */}
              {((isAdd && allowCreate) || (isEditable && allowUpdate)) && <FontIcon icon={faSave} disabled={isSaveEnable} isClicked={!isSaveEnable} onClick={handleSave} />}
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

        <RenderForm form={form} isReadable={isRead} onChange={handleChange} />
      </div>
    </div>
  );
};
