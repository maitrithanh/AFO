"use client";

import DefaultImage from "@/app/components/shared/defaultImage";
import { useGlobalContext } from "@/app/contexts/GlobalContext";
import GetMessagesRes from "@/types/GetMessagesRes";
import { getImageUrl } from "@/utils/image";
import {
  ContactListData,
  OnReadMessage,
  onMessageReceived,
  readMessage,
  unBindEvent,
} from "@/utils/signalr/chatHub";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Asap_Condensed } from "next/font/google";

const font_asap_condensed = Asap_Condensed({
  weight: "400", // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});

interface Props {
  onSelect: (id: ContactListData) => void;
  titleChat?: boolean;
}

const ContactList = ({ onSelect, titleChat }: Props) => {
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
  }, [contactData]);

  return (
    <div className="flex flex-col p-3 overflow-y-auto h-full">
      <div
        className={`text-3xl mb-3 font-bold ${font_asap_condensed.className} ${
          titleChat ? "visible" : "invisible"
        }`}
      >
        Danh sách liên hệ
      </div>

      {list &&
        list.map((x) => (
          <div
            key={x.userId}
            className={`${
              x.userId === currId ? "bg-slate-300" : ""
            } flex p-3 hover:bg-slate-200 cursor-pointer rounded-xl items-center mb-3`}
            onClick={() => onSelect(x)}
          >
            <div className="mr-3 relative">
              <DefaultImage
                img={getImageUrl(x.avatar)}
                fallback="/avatar.webp"
                className={`w-14 h-14 rounded-full cursor-pointer`}
                custom="w-[50px] h-[50px]"
              />

              <div
                className={`${
                  x.isOnline ? "bg-green-500" : "bg-slate-500"
                } absolute right-0 bottom-0 h-[15px] w-[15px] rounded-full`}
              ></div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <div className="font-bold flex-1 mr-3 text-left">{x.name}</div>
                {x.newMessage && (
                  <div className="text-blue-500 text-sm">Có tin nhắn mới</div>
                )}
              </div>
              <div className="text-left">{x.title}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ContactList;
