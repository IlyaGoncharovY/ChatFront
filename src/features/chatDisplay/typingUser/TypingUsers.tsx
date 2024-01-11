import {useAppSelector} from '../../../store';

import {UserType} from '../reducer/chatDisplayReducer.ts';

import {TypingUserItem} from './item/TypingUserItem.tsx';

export const TypingUsers = () => {

  const typingUsers = useAppSelector(state => state.typingUsers.typingUsers);

  return (
    <div>
      {typingUsers.map((user: UserType) =>
        <TypingUserItem key={user.id} user={user}/>)}
    </div>
  );
};
