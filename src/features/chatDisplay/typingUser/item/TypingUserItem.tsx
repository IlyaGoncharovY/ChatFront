import {FC} from 'react';

import {UserType} from '../../reducer/chatDisplayReducer.ts';

interface ITypingUserItem {
    user: UserType
}

export const TypingUserItem:FC<ITypingUserItem> = ({user}) => {
  return (
    <div>
      <b>{user.name}:</b> .....
    </div>
  );
};
