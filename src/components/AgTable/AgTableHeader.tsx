import { faPlus, faRefresh, faTrashRestore, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

// import { RefreshButton } from "./RefreshButton";

export interface IAgTableHeader {
  headerLabel: string | any;
  showAddIcon?: boolean;
  showRefreshIcon?: boolean;
  showReloadIcon?: boolean;
  showDownloadIcon?: boolean;
  showRecoveryIcon?: boolean;
  onAdd?: () => void;
  onReload?: () => void;
  onExportCsv?: () => void;
  onRecover?: () => void;
  // refreshCallback?: () => void;
}

export const AgTableHeader: React.FC<IAgTableHeader> = ({
  headerLabel,
  showAddIcon,
  // showRefreshIcon,
  showReloadIcon,
  showDownloadIcon,
  showRecoveryIcon,
  onAdd,
  onReload,
  onExportCsv,
  onRecover,
  // refreshCallback = () => {},
}) => {
  return (
    <div className='header-bar'>
      {typeof headerLabel === 'string' ? <div className='label' dangerouslySetInnerHTML={{ __html: headerLabel }} /> : <div className='label'>{headerLabel}</div>}

      <div className='table-actionbar'>
        {/* {showAddIcon && <IconButton id='add' fileName='Icon-add' size='medium' toolTipArrow={false} toolTipPlacement='left' toolTipText={'Add'} onClick={onAdd && onAdd} />} */}
        {showAddIcon && (
          <span onClick={onAdd && onAdd}>
            <FontAwesomeIcon icon={faPlus} />
          </span>
        )}
        {/* {showReloadIcon && <IconButton fileName='Icon-reload' size='medium' toolTipArrow={false} toolTipPlacement='left' toolTipText={'Reload'} onClick={onReload && onReload} />} */}
        {showReloadIcon && (
          <span onClick={onReload && onReload}>
            <FontAwesomeIcon icon={faRefresh} />
          </span>
        )}
        {/* {showDownloadIcon && <IconButton fileName='Icon-upload' size='medium' toolTipArrow={false} toolTipPlacement='left' toolTipText={'Export'} onClick={onExportCsv && onExportCsv} />} */}
        {showDownloadIcon && (
          <span onClick={onExportCsv && onExportCsv}>
            <FontAwesomeIcon icon={faUpload} />
          </span>
        )}
        {/* {showRecoveryIcon && <IconButton fileName='Icon-recover-trash-list' size='medium' toolTipArrow={false} toolTipPlacement='left' toolTipText={'Recovery'} onClick={onRecover && onRecover} />} */}
        {showRecoveryIcon && (
          <span onClick={onRecover && onRecover}>
            <FontAwesomeIcon icon={faTrashRestore} />
          </span>
        )}
        {/* {showRefreshIcon && <RefreshButton countDownStart={27} cb={refreshCallback} />} */}
      </div>
    </div>
  );
};
