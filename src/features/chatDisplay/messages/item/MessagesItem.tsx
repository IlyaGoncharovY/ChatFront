import {FC, memo} from 'react';

import {useAppSelector} from '../../../../store';
import {MessageType} from '../../reducer/chatDisplayReducer.ts';

import s from './MessagesItem.module.css';

interface IMessagesItem{
    message: MessageType
}

export const MessagesItem:FC<IMessagesItem> = memo(({message}) => {

  const name = useAppSelector(state => state.buttons.name);

  const isUserMessage = message.user.name === name;

  return (
    <div className={`${s.messageContainer} ${isUserMessage ? s.userMessage : s.otherMessage}`}>
      <div className={`${s.messageContent} ${isUserMessage ? s.userMessageContent : s.otherMessageContent}`}>
        <b>{message.user.name}:</b>
        <div className={s.messageMessage}>
          {message.message}
        </div>
      </div>
    </div>
  );
});
