import {FC} from 'react';

interface IUniversalButton {
    callBack: () => void
    title: string
    disabled: boolean
}

export const UniversalButton: FC<IUniversalButton> = ({callBack, title, disabled}) => {
  return (
    <>
      <button
        onClick={callBack}
        disabled={disabled}
        style={disabled ? {cursor: 'no-drop'} : {cursor: 'pointer'}}
      >
        {title}
      </button>
    </>
  );
};
