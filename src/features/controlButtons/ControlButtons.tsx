import {useAppSelector} from '../../store';

import {UniversalButton} from '../../common';

import s from './ControlButtons.module.css';
import {useControlButtons} from './helpers';

export const ControlButtons = () => {

  const isSetName = useAppSelector(state => state.buttons.name);
  const inputError = useAppSelector(state => state.app.inputError);

  const {
    name,
    message,
    onKeyDownHandler,
    onChangeTextareaHandler,
    onChangeInputHandler,
    onClickNameHandler,
    onClickSocketHandler,
  } = useControlButtons();

  return (
    <div className={s.controlButtonsContainer}>
      <div>
        <input
          type="text"
          value={name}
          onChange={onChangeInputHandler}
          placeholder={'set name...'}
          className={s.inputContainer}
        />
        <UniversalButton callBack={onClickNameHandler} title={'send name'} disabled={!name}/>
      </div>
      <div>
        <textarea
          value={message}
          onChange={onChangeTextareaHandler}
          onKeyDown={onKeyDownHandler}
          placeholder={'set message...'}
          className={s.textareaContainer}
        >
          {inputError && <div className={s.errorContainer}>{inputError}</div>}
        </textarea>
        <UniversalButton callBack={onClickSocketHandler} title={'send'} disabled={!isSetName || !message}/>
      </div>
    </div>
  );
};
