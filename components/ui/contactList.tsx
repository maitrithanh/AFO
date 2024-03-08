"use client"

import DefaultImage from "@/app/components/shared/defaultImage"
import { useGlobalContext } from "@/app/contexts/GlobalContext"
import GetMessagesRes from "@/types/GetMessagesRes"
import { ContactListData, OnReadMessage, onMessageReceived, readMessage, unBindEvent } from "@/utils/signalr/chatHub"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

interface Props { 
    onSelect: (id: ContactListData) => void,
}

const ContactList = ({ onSelect }: Props) => { 

    const [list, setList] = useState<ContactListData[]>([]);
    const { contactList: contactData, currChat } = useGlobalContext();

    const currIdRef = useRef<string | undefined>(undefined);
    const currId = currChat?.userId;

    //signalR events
    // useEffect(() => { 

    //     //khi đọc tin nhắn thì tắt "có tin nhắn mới"
    //     const OnReadMessageCb = (users: { id: string, receiverId: string, time: string }) => { 
    //         setList(x => x.map(y => { 
    //             if (y.userId === users.receiverId) return { ...y, newMessage: false };
    //             return y;
    //         }))
    //     }
    //     OnReadMessage(OnReadMessageCb)

    //     //khi nhận tin nhắn
    //     const onMessageReceivedCb = (data: GetMessagesRes) => {
            
    //         //nếu là tin đang đọc thì gửi event đã đọc về
    //         if (currIdRef.current === data.senderId) { 
    //             readMessage(data.senderId);
    //             return;
    //         }

    //         //nếu là tin nhắn người khác thì hiện "có tin nhắn mới" của người đó
    //         setList(x => x.map(y => {
    //             if (data.senderId === y.userId) return { ...y, newMessage: true }
    //             return y;
    //         }))
    //     }
    //     onMessageReceived(onMessageReceivedCb)

    //     return () => { 
    //         unBindEvent('onReadMessage', OnReadMessageCb);
    //         unBindEvent('onNewMessage', onMessageReceivedCb);
    //     }

    // }, [])

    useEffect(() => { 
        if (contactData) setList(contactData);
    }, [contactData])

    return <div className="flex flex-col p-3 overflow-y-auto h-full">
        <div className="text-xl mb-3 font-bold">
            Danh sách liên hệ
        </div>

        {list && list.map(x => <div key={x.userId}
            className={`${x.userId === currId ? 'bg-slate-300': ''} flex p-3 hover:bg-slate-200 cursor-pointer rounded-xl items-center mb-3`}
            onClick={() => onSelect(x)}
        >
            <div className="mr-3 relative">
                <DefaultImage
                    img={x.avatar}
                    fallback="/avatar.webp"
                    className={`w-14 h-14 rounded-full cursor-pointer`}
                    custom="w-[50px] h-[50px]"
                />

                <div className={`${x.isOnline ? 'bg-green-500' : 'bg-slate-500'} absolute right-0 bottom-0 h-[15px] w-[15px] rounded-full`}>
                </div>
            </div>
            <div className="flex-1">
                <div className="flex justify-between">
                    <div className="font-bold flex-1 mr-3">{x.name}</div>
                    {
                        x.newMessage &&
                        <div className="text-blue-500 text-sm">
                            Có tin nhắn mới
                        </div>
                    }

                </div>
                <div>{x.title}</div>
            </div>
        </div>)}
    </div>
}

export default ContactList