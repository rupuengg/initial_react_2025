import { faPlus, faRefresh, faTrashRestore, faUpload } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { FontIcon } from 'components/Icon';

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
      {typeof headerLabel === 'string' ? <h1 className='header1' dangerouslySetInnerHTML={{ __html: headerLabel }} /> : <h1 className='header1'>{headerLabel}</h1>}

      <div className='table-actionbar'>
        {showAddIcon && <FontIcon icon={faPlus} isDisabled={false} onClick={onAdd} />}

        {showReloadIcon && <FontIcon icon={faRefresh} onClick={onReload} />}

        {showDownloadIcon && <FontIcon icon={faUpload} onClick={onExportCsv} />}

        {showRecoveryIcon && <FontIcon icon={faTrashRestore} onClick={onRecover} />}
      </div>
    </div>
  );
};
