import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useMemo, useState } from 'react';

export interface IFontIcon {
  icon: IconProp;
  isDisabled?: boolean;
  isRead?: boolean;
  color?: string;
  onClick?: (e?: any) => void;
}

export const FontIcon: React.FC<IFontIcon> = ({ icon, isDisabled, isRead, color, onClick }) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const read = useMemo(() => {
    if (isRead !== undefined) {
      return isRead ? ' read' : '';
    }
    return '';
  }, [isRead]);

  const handleMouseOver = useCallback(() => {
    if (!isDisabled) setIsHover(true);
  }, [isDisabled]);

  const handleMouseLeave = useCallback(() => {
    if (!isDisabled) setIsHover(false);
  }, [isDisabled]);

  const handleClick = useCallback(() => {
    if (!isDisabled && onClick) onClick();
  }, [isDisabled, onClick]);

  return (
    <span className={`font-awesome-icon${read}${isHover ? ' hover' : ''}${isDisabled ? ' disable' : ''}`} onClick={handleClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <FontAwesomeIcon icon={icon} {...(color ? { color: color } : { color: '#cccccc' })} />
    </span>
  );
};
