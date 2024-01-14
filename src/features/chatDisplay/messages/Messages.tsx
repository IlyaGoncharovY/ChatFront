import {useEffect, useRef, useState} from 'react';

import {useAppSelector} from '../../../store';

import {MessageType} from '../reducer/chatDisplayReducer.ts';

import {MessagesItem} from './item/MessagesItem.tsx';

import s from './Messages.module.css';

export const Messages = () => {

  const messages = useAppSelector(state => state.messages.messages);

  const messageBlockRef = useRef<HTMLDivElement>(null);

  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true);

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
    if (isAutoScroll) {
      messageBlockRef.current?.scrollIntoView({behavior: 'smooth'});
    }
  }, [isAutoScroll, messages]);

  return (
    <div className={s.messagesContainer} onScroll={scrollEventHandler}>
      <div className={s.messagesContent}>
        {messages.map((message: MessageType) =>
          <MessagesItem key={message.id} message={message}/>)}
        <div ref={messageBlockRef}/>
      </div>
    </div>
  );
};
