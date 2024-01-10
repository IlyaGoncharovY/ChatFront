import {ChangeEvent, useEffect, useRef, useState} from 'react';

import {useAppDispatch, useAppSelector} from '../../store/hook.ts';

import {
  createConnectionTC,
  destroyConnectionTC,
  setClientNameTC,
  setNewMessageTC,
  typeMessageTC,
} from './reducer/chatReducer.ts';

type UserType = {
    id: string
    name: string
}

type MessagesType = {
    message: string,
    id: string,
    user: UserType
}

function App() {

  const messages = useAppSelector(state => state.chat.messages);
  const typingUsers = useAppSelector(state => state.chat.typingUsers);

  const dispatch = useAppDispatch();

  const [message, setMessage] = useState<string>('');

  const [name, setName] = useState<string>('');

  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true);

  const [lastScrollTop, setLastScrollTop] = useState<number>(0);

  const messageBlockRef = useRef<HTMLDivElement>(null);

  const onChangeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value);
  };

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onClickSocketHandler = () => {
    dispatch(setNewMessageTC(message));
    setMessage('');
  };

  const onClickNameHandler = () => {
    dispatch(setClientNameTC(name));
  };

  const typeUserMessageHandler = () => {
    dispatch(typeMessageTC());
  };

  const scrollEventHandler = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = event.currentTarget;
    const maxScrollPosition = element.scrollHeight - element.clientHeight;
    if (element.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - element.scrollTop) < 10) {
      setIsAutoScroll(true);
    } else {
      setIsAutoScroll(false);
    }
    setLastScrollTop(element.scrollTop);
  };

  useEffect(() => {
    dispatch(createConnectionTC());
    return () => {
      dispatch(destroyConnectionTC());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isAutoScroll) {
      messageBlockRef.current?.scrollIntoView({behavior: 'smooth'});
    }
  }, [isAutoScroll, messages]);
  console.log(typingUsers);
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div>
        <div style={{
          border: '1px solid black',
          padding: '10px',
          height: '300px',
          overflow: 'scroll',
          width: '300px',
        }}
        onScroll={scrollEventHandler}
        >
          {messages.map((message: MessagesType) =>
            <div key={message.id}>
              <b>{message.user.name}:</b> {message.message}
              <hr/>
            </div>)}
          <div ref={messageBlockRef}/>
        </div>
        {typingUsers.map((user: UserType) =>
          <div key={user.id}>
            <b>{user.name}:</b> .....
          </div>)}
        <div>
          <input type="text" value={name} onChange={onChangeInputHandler}/>
          <button onClick={onClickNameHandler}>send name</button>
        </div>
        <div>
          <textarea
            value={message}
            onChange={onChangeTextareaHandler}
            onKeyPress={typeUserMessageHandler}
          >
          </textarea>
          <button onClick={onClickSocketHandler}>send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
