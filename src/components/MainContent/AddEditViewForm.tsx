import { faCross, faEdit, faHistory, faRefresh, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { IApplicationState } from 'store';

export function mapFormWithValues(form: IBaseForm, entity: CommonEntity): IBaseForm {
  const cb = (frm: IBaseForm): IBaseForm => {
    const newFrm: IBaseForm = { ...frm };

    if (newFrm.type === E_Form_Type.FIELD && newFrm.fieldName && entity[newFrm.fieldName]) newFrm.fieldValue = entity[newFrm.fieldName] as keyof CommonEntity;

    if (newFrm.type === E_Form_Type.COLUMN) newFrm.rows = newFrm.rows?.map(r => ({ ...r, ...cb(r) }));
    else if (newFrm.type === E_Form_Type.ROW) newFrm.fields = newFrm.fields?.map(f => ({ ...f, ...cb(f) }));

    return newFrm;
  };

  return cb(form);
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
  const { workspace, entityData } = useSelector((state: IApplicationState) => state);
  const { path, entrypoint, sectionId, mainNavTitle, mfeSupTitle, mfeTitle } = workspace;
  const { mapper, entityForm, defaultEntity } = useTableMapper(path, entrypoint, sectionId);
  const { allowCreate, allowUpdate } = useANAModulePermission(mapper.permission);
  const { isAdd, isEditable, isRead } = getPermission(type);
  const [item, setItem] = useState<CommonEntity | undefined>();
  const [initialItem, setInitialItem] = useState<CommonEntity | undefined>();
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Set item by ID
  useEffect(() => {
    if (params.dataId && params.entity && entityData.items[params.entity]) {
      setItem(entityData.items[params.entity].list.find(i => i.key === params.dataId));
      setInitialItem(entityData.items[params.entity].list.find(i => i.key === params.dataId));
    } else {
      if (defaultEntity) {
        setItem(defaultEntity);
        setInitialItem(defaultEntity);
      }
    }
  }, [type, params.entity, params.dataId, entityData, defaultEntity]);

  // Map item with form
  const form = useMemo(() => {
    if (item && entityForm) return mapFormWithValues(entityForm, item);
    return null;
  }, [item, entityForm]);

  const handleChange = useCallback(
    (fieldName: string, fieldValue: string | number | string[] | undefined | null) => {
      console.log(fieldName, fieldValue);
      setItem((p: CommonEntity | undefined) => (p ? { ...p, [fieldName]: fieldValue } : undefined));
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
  //       if (yardBlock.blockStacks && yardBlock.blockStacks.length === 0) {
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

  // const commonProps = {
  //   ...props,
  //   isAdd: props.isAdd,
  //   isRead: props.isRead,
  //   isEditable: props.isEditable,
  //   isSaveClicked: isSave,
  //   yardBlock: props.yardBlock,
  //   errorMessages: errors,
  //   yardBlocks: props.yardBlocks,
  //   setErrors: setErrors,
  //   onFieldChange: props.onFieldChange,
  //   requiredFields: Object.keys(isAdd ? createBlockValidation : updateBlockValidation),
  // };

  const isDisable = useMemo(() => {
    if (type === 'add') {
      return !allowCreate;
    }

    if (type === 'edit') {
      return !allowUpdate;
    }
  }, [type, allowCreate, allowUpdate]);

  const getTitle = useMemo(() => {
    const parentTitle = mainNavTitle?.length ? mainNavTitle : mfeSupTitle;
    const titles: { title: string }[] = parentTitle ? parentTitle.map((item: any) => ({ title: item })) : [];
    titles.push({ title: mfeTitle || '' });

    if (type === E_Operation_Permission.ADD) titles.push({ title: 'Add' });
    else {
      titles.push({ title: 'View' });
      if (type === E_Operation_Permission.EDIT) titles.push({ title: 'Edit' });
    }

    return titles;
  }, [type, mainNavTitle, mfeSupTitle, mfeTitle]);

  const handleEdit = useCallback(() => {
    navigate({
      pathname: UrlUtils.makeRouteWidthoutSearch(params.entity, params.other, E_Operation_Permission.EDIT, params.dataId),
      search: `?${searchParams.toString()}`,
    });
  }, []);

  const handleClose = useCallback(() => {
    if (type === E_Operation_Permission.EDIT) {
      navigate({
        pathname: UrlUtils.makeRouteWidthoutSearch(params.entity, params.other, E_Operation_Permission.VIEW, params.dataId),
        search: `?${searchParams.toString()}`,
      });
    } else {
      navigate({
        pathname: UrlUtils.makeRouteWidthoutSearch(params.entity, params.other),
        search: `?${searchParams.toString()}`,
      });
    }
  }, [type]);

  const handleReset = useCallback(() => {}, []);

  const handleSave = useCallback(() => {
    navigate({
      pathname: UrlUtils.makeRouteWidthoutSearch(params.entity, params.other),
      search: `?${searchParams.toString()}`,
    });
  }, []);

  const handleAmend = useCallback(() => {}, []);

  console.log('item', item, form);
  return (
    <div className='main-box' style={{ width: '100%', border: 'none', backgroundColor: '#FFFFFF', overflow: 'auto', padding: '0' }}>
      <div className='header-bar' style={{ width: '100%', alignItems: 'center' }}>
        {/* <Breadcrumb style={{ margin: '0' }}>
          <HPHBreadcrumb breadcrumbData={getTitle} onCurrentClick={handleClose}></HPHBreadcrumb>
        </Breadcrumb> */}

        <div className='action'>
          {!isAdd && (
            <>
              {/* Amendment History */}
              {/* <IconButton fileName='Icon-doc' size='medium' toolTipArrow toolTipPlacement='bottom' toolTipText='Amendment History' onClick={handleAmend} /> */}
              <span onClick={handleAmend}>
                <FontAwesomeIcon icon={faHistory} />
              </span>
            </>
          )}

          {!isAdd && isEditable && isRead && (
            <>
              {/* Edit Button */}
              {/* {isEditable && allowUpdate && <IconButton fileName='Icon-pen' size='medium' toolTipText={'Edit'} toolTipArrow={false} onClick={handleEdit} />} */}
              <span onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} />
              </span>
              {/* Close Button */}
              {/* {<IconButton fileName='Icon-cross' size='medium' toolTipText={'Close'} toolTipArrow={false} onClick={handleClose} />} */}
              <span onClick={handleClose}>
                <FontAwesomeIcon icon={faCross} />
              </span>
            </>
          )}
          {(isAdd || (isEditable && !isRead)) && (
            <>
              {/* Reset Form Button */}
              {/* <IconButton fileName='Icon-reset' size='medium' toolTipArrow={false} toolTipPlacement='bottom' toolTipText={'Reset'} onClick={handleReset} /> */}
              <span onClick={handleReset}>
                <FontAwesomeIcon icon={faRefresh} />
              </span>
              {/* Close Button */}
              <span onClick={handleClose}>
                <FontAwesomeIcon icon={faCross} />
              </span>
              {/* Save Button */}
              {((isAdd && allowCreate) || (isEditable && allowUpdate)) && (
                <span onClick={handleSave}>
                  <FontAwesomeIcon icon={faSave} />
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* Readable and Editable Form */}
      <div className={'form-layouts'} id='block-add-edit-form'>
        {/* If user add new record */}
        {isAdd && <div className='title'>{`NEW ${mfeTitle?.toUpperCase()}`}</div>}

        {/* If user edit existing record */}
        {isEditable && <div className='title'>{params.dataId}</div>}

        {(isAdd || (isEditable && !isRead)) && <p>Form Remark</p>}

        <div style={{ marginTop: '30px', width: '100%' }}>
          {/* General Information */}
          {/* <BlockGeneralInformation {...commonProps} /> */}
          {form && <RenderForm form={form} isReadable={isRead} onChange={handleChange} />}
          <pre>
            <code>{JSON.stringify(item, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
