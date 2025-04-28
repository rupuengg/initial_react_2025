import { faCopy, faEdit, faMessage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ICellRendererParams } from 'ag-grid-community';
import moment from 'moment';
import { useCallback, useMemo } from 'react';
import { CommonEntity } from 'entities';
import { E_Renderer_Type } from 'enums';
import { FontIcon } from 'components/Icon';

interface ICellRemdererComponent {
  params: ICellRendererParams<CommonEntity>;
  onClick?: (params: ICellRendererParams<CommonEntity>, type: any) => void;
}

export const CellRemdererComponent: React.FC<ICellRemdererComponent> = ({ params, onClick }) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, type?: any) => {
      if (onClick) onClick(params, type);
    },
    [params]
  );

  const html = useMemo(() => {
    switch (params.colDef?.cellDataType) {
      case E_Renderer_Type.DATE: {
        if (!params.value) return null;
        const val: any = moment(params.value)?.format('DD/MM/YYYY HH:mm');
        return val === 'Invalid date' ? '' : val;
      }
      case E_Renderer_Type.COLOR:
        return (
          <div className='color-picker-wrapper'>
            <div className='color-circle' style={{ backgroundColor: '#' + params.value }}></div>
            <div className='color-label'>{params.value}</div>
          </div>
        );
      case E_Renderer_Type.MESSAGE_READ:
        return <FontIcon icon={faMessage} isRead={!params.value} />;
      case E_Renderer_Type.TICK:
        return Boolean(params.value) === true && <span>Tick</span>;
      case E_Renderer_Type.VALUE_EITHER_N:
        return params?.value ? params?.value : 'N';
      case E_Renderer_Type.ACTION:
        return (
          <>
            <FontIcon icon={faCopy} onClick={e => handleClick(e, 'copy')} />
            <FontIcon icon={faEdit} onClick={e => handleClick(e, 'edit')} />
            <FontIcon icon={faTrash} onClick={e => handleClick(e, 'delete')} />
          </>
        );
      default:
        return params.value;
    }
  }, [params]);

  return html;
};
