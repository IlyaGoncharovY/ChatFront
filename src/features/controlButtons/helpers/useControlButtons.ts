import {ChangeEvent, useCallback, useState} from 'react';

import {useAppDispatch} from '../../../store';
import {setClientName, setClientNameTC, setNewMessageTC, typeMessageTC} from '../reducer/controlButtonsReducer.ts';
import {setError} from '../../app/reducer/appReducer.ts';

/**
 * custom hook for ControlButton.tsx
 * @field name - name for user
 * @field message - message for chat
 * @field onChangeTextareaHandler - event handler for <textarea> setMessage
 * @field onChangeInputHandler - event handler for <input> setName
 * @field onClickNameHandler - set 'name' thunk and reducer
 * @field onKeyDownHandler - event handler for listening to the pressed key 'enter': set message, typing user
 * @field onClickSocketHandler -  event handler for set 'message'
 *
 * @return name
 * @return message
 * @return onChangeTextareaHandler
 * @return onChangeInputHandler
 * @return onClickNameHandler
 * @return onKeyDownHandler
 * @return onClickSocketHandler
 */
export const useControlButtons = () => {

  const [message, setMessage] = useState<string>('');
  const [name, setName] = useState<string>('');

  const dispatch = useAppDispatch();

  const onChangeTextareaHandler = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.currentTarget.value);
    },
    [],
  );

  const onChangeInputHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.currentTarget.value);
    },
    [],
  );

  const onClickSocketHandler = useCallback(() => {
    dispatch(setNewMessageTC(message));
    setMessage('');
  }, [dispatch, message]);

  const onClickNameHandler = useCallback(() => {
    dispatch(setClientNameTC(name));
    dispatch(setClientName(name));
  }, [dispatch, name]);

  const typeUserMessageHandler = useCallback(() => {
    dispatch(typeMessageTC());
  }, [dispatch]);

  const onKeyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      typeUserMessageHandler();
      if (e.key === 'Enter') {
        if (!name || !message) {
          e.preventDefault();
          dispatch(setError('Enter a name or message'));
        } else {
          dispatch(setError(''));
          onClickSocketHandler();
        }
      }
    },
    [onClickSocketHandler, typeUserMessageHandler, name, message, dispatch],
  );

  return {
    name,
    message,
    onChangeTextareaHandler,
    onChangeInputHandler,
    onClickNameHandler,
    onKeyDownHandler,
    onClickSocketHandler,
  };
};
