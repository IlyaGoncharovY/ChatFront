import {FC, memo} from 'react';

import {UserType} from '../../reducer/chatDisplayReducer.ts';

import s from './TypingUser.module.css';

interface ITypingUserItem {
    user: UserType
}

export const TypingUserItem:FC<ITypingUserItem> = memo(({user}) => {
  return (
    <div className={s.typingUserContainer}>
      <b>{`${user.name}: ...`}</b>
    </div>
  );
});
