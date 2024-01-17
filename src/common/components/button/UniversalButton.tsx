import {FC, memo} from 'react';

interface IUniversalButton {
    callBack: () => void
    title: string
    disabled: boolean
}

export const UniversalButton: FC<IUniversalButton> = memo(({callBack, title, disabled}) => {
  return (
    <>
      <button
        onClick={callBack}
        disabled={disabled}
        style={disabled ? {cursor: 'no-drop', background: '#ededf5'} : {cursor: 'pointer'}}
      >
        {title}
      </button>
    </>
  );
});
