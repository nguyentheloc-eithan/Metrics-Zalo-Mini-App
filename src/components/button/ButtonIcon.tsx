import React from 'react';
import { Icon } from 'zmp-ui';

interface ButtonIconParams {
  icon: any;
  active?: boolean;
  onClick?: any;
}
const ButtonIcon = (props: ButtonIconParams) => {
  const { icon, active, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={`h-[32px] flex items-center justify-center ${
        active ? 'bg-[#36383A]' : 'bg-[white]'
      }  w-[32px] rounded-[4px] border border-[#B9BDC1] p-[8px]`}>
      <Icon
        className={`${active ? 'text-white' : 'text-[#36383A]'}`}
        icon={icon}
        size={16}
      />
    </button>
  );
};

export default ButtonIcon;
