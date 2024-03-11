"use client"

import { useEffect, useRef, useState } from "react"
import ContactList from "./contactList"
import Message from "./message"
import { ContactListData, OnReadMessage, unBindEvent } from "@/utils/signalr/chatHub"
import { useGlobalContext } from "@/app/contexts/GlobalContext"

const ContactPage = () => { 

    const { selectChat } = useGlobalContext();

    // const [currChat, setCurrChat] = useState<ContactListData | null>(null);
    // const currChatRef = useRef<ContactListData | null>(null);
    // currChatRef.current = currChat;

    //signalR events
    // useEffect(() => { 

    //     //chỉnh last seen cho chat hiện tại
    //     const cb = (data: { id: string, receiverId: string, time: string }) => {
    //         if (currChatRef.current?.userId !== data.id) return;

    //         setCurrChat(x => {
    //             return x ? { ...x, lastSeen: data.time } : x
    //         })
    //     }
    //     OnReadMessage(cb);

    //     return () => { 
    //         unBindEvent('onReadMessage', cb);
    //     }
    // }, [])

    return <div className="bg-white h-[80vh] flex w-[80vw] m-auto rounded-md">
        <div className="flex-[4] border-r-2 border-slate-200">
            <ContactList onSelect={(id) => selectChat!(id)}/>
        </div>

        <div className="flex-[8]">
             <Message  />
        </div>
    </div>
}

export default ContactPage

//có tin nhắn mới chat tự scroll xuống
//lọc theo ngày? tìm kiểm tin nhắn?