import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IFontIcon {
  icon: IconProp;
  className?: string;
  disabled?: boolean;
  isClicked?: boolean;
  color?: string;
  onClick?: (e?: any) => void;
}

export const FontIcon: React.FC<IFontIcon> = ({ icon, disabled, color, isClicked = true, onClick }) => {
  return (
    <span className='font-awesome-icon' onClick={() => isClicked && onClick && onClick()}>
      <FontAwesomeIcon icon={icon} color={disabled ? '#cccccc' : color || '#bb8f71'} />
    </span>
  );
};
