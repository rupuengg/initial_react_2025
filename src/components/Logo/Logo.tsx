import { LogoSvg } from './LogoSvg';

export interface ILogo {
  titleColor?: string;
}

export const Logo: React.FC<ILogo> = ({ titleColor = '#111111' }) => {
  return (
    <div className='logo'>
      <LogoSvg titleColor={titleColor} />
    </div>
  );
};
