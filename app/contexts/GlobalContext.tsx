"use client"

import { ContactListData, OnReadMessage, connectToSignalR, disconnectFromSignalR, onGetContactList, onMessageReceived, onNewUserConnect, readMessage } from "@/utils/signalr/chatHub";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { getCookie } from "cookies-next";
import GetMessagesRes from "@/types/GetMessagesRes";

interface Props {
    children: React.ReactNode
}

export interface GlobalContextValue {
    refreshContactList?: () => void,
    contactList?: ContactListData[],
    selectChat?: (chat: ContactListData) => void,
    currChat?: ContactListData
}

const GlobalContext = createContext<GlobalContextValue>({})

export default function GlobalContextProvider({ children }: Props) { 

    const [contactList, setContactList] = useState<ContactListData[]>([])
    const [contactListFlag, setContactListFlag] = useState(false)
    const [currChat, setCurrChat] = useState<ContactListData | undefined>(undefined);
    const currChatRef = useRef<ContactListData | undefined>(undefined);
    currChatRef.current = currChat;

    useEffect(() => {

        const connect = async () => {
            var token = getCookie('token');
            if (!token) return;
            await connectToSignalR(token);

            onGetContactList((listContact) => {
                setContactList(listContact);
            })
        };

        connect();

        //khi đọc tin nhắn thì tắt "có tin nhắn mới"
        const OnReadMessageCb = (users: { id: string, receiverId: string, time: string }) => {
            setContactList(x => x.map(y => {
                if (y.userId === users.receiverId) return { ...y, newMessage: false };
                return y;
            }));

            //chỉnh last seen cho chat hiện tại
            if (currChatRef.current?.userId !== users.id) return;
            setCurrChat(x => {
                return x ? { ...x, lastSeen: users.time } : x
            })
        }
        OnReadMessage(OnReadMessageCb)

        //khi nhận tin nhắn
        const onMessageReceivedCb = (data: GetMessagesRes) => {

            //nếu là tin đang đọc thì gửi event đã đọc về
            if (currChatRef.current?.userId === data.senderId) {
                readMessage(data.senderId);
                return;
            }

            //nếu là tin nhắn người khác thì hiện "có tin nhắn mới" của người đó
            setContactList(x => x.map(y => {
                if (data.senderId === y.userId) return { ...y, newMessage: true }
                return y;
            }))
        }
        onMessageReceived(onMessageReceivedCb)

        return () => {
            disconnectFromSignalR();
            // unBindEvent('onReadMessage', OnReadMessageCb);
            // unBindEvent('onNewMessage', onMessageReceivedCb);
        }
    }, [contactListFlag])

    useEffect(() => {
        onNewUserConnect((user) => {
            setContactList(x => x.map(y => y.userId != user.userId ? y : { ...y, isOnline: user.online }));
        })
    }, [contactList])

    return <GlobalContext.Provider value={
        {
            contactList,
            refreshContactList: () => setContactListFlag(x => !x),
            selectChat: (chat: ContactListData) => setCurrChat(chat),
            currChat
        }
    }>
        {children}
    </GlobalContext.Provider>
}

export function useGlobalContext() { 
    return useContext(GlobalContext);
}