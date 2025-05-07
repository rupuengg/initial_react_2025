import { faPlus, faRefresh, faTrashRestore, faUpload } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { FontIcon } from 'components/Icon';

export interface IAgTableHeader {
  headerLabel: string | any;
  showAddIcon?: boolean;
  showRefreshIcon?: boolean;
  showReloadIcon?: boolean;
  showDownloadIcon?: boolean;
  showRecoveryIcon?: boolean;
  isRefreshDone?: boolean;
  onAdd?: () => void;
  onReload?: () => void;
  onExportCsv?: () => void;
  onRecover?: () => void;
  refreshCallback?: () => void;
}

export const AgTableHeader: React.FC<IAgTableHeader> = ({
  headerLabel,
  showAddIcon,
  showRefreshIcon,
  showReloadIcon,
  showDownloadIcon,
  showRecoveryIcon,
  isRefreshDone,
  onAdd,
  onReload,
  onExportCsv,
  onRecover,
  refreshCallback = () => {},
}) => {
  // 0 - None
  // 1 - Start
  // 2 - End
  const [isRefreshStart, setIsRefreshStart] = useState<number>(0);

  useEffect(() => {
    if (isRefreshDone) {
      setIsRefreshStart(2);
    }
  }, [isRefreshDone]);

  const handleRefresh = useCallback(() => {
    if (refreshCallback) {
      setIsRefreshStart(1);
      refreshCallback();
    }
  }, []);

  return (
    <div className='header-bar'>
      {typeof headerLabel === 'string' ? <h1 className='header1' dangerouslySetInnerHTML={{ __html: headerLabel }} /> : <h1 className='header1'>{headerLabel}</h1>}

      <div className='table-actionbar'>
        {showAddIcon && <FontIcon icon={faPlus} isDisabled={false} onClick={onAdd} />}

        {showReloadIcon && <FontIcon icon={faRefresh} onClick={onReload} />}

        {showDownloadIcon && <FontIcon icon={faUpload} onClick={onExportCsv} />}

        {showRecoveryIcon && <FontIcon icon={faTrashRestore} onClick={onRecover} />}

        {(isRefreshStart === 0 || isRefreshStart === 2) && showRefreshIcon && <FontIcon icon={faRefresh} onClick={handleRefresh} />}

        {isRefreshStart === 1 && <span>Loading...</span>}
      </div>
    </div>
  );
};
