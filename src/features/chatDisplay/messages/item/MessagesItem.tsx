import {FC} from 'react';

import {MessageType} from '../../reducer/chatDisplayReducer.ts';

interface IMessagesItem{
    message: MessageType
}

export const MessagesItem:FC<IMessagesItem> = ({message}) => {
  return (
    <div>
      <b>{message.user.name}:</b> {message.message}
      <hr/>
    </div>
  );
};
