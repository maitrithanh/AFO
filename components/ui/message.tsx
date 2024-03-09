import DefaultImage from "@/app/components/shared/defaultImage";
import { useGlobalContext } from "@/app/contexts/GlobalContext";
import GetMessagesRes from "@/types/GetMessagesRes";
import { toDMY } from "@/utils/dateTime";
import {
  ContactListData,
  onMessageReceived,
  readMessage,
  sendMessage,
  unBindEvent,
} from "@/utils/signalr/chatHub";
import useFetch from "@/utils/useFetch";
import { FormEvent, useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa6";

const Message = () => {
  const { currChat } = useGlobalContext();
  const receiver = currChat;

  const [chatLogs, setChatLogs] = useState<GetMessagesRes[]>([]);
  const { data: chatData } = useFetch<GetMessagesRes[]>(
    "Chat/getChatLog/" + receiver?.userId,
    null,
    receiver?.userId
  );
  const [msg, setMsg] = useState("");

  const receiverId = useRef<string>();
  receiverId.current = receiver?.userId;

  useEffect(() => {
    if (chatData) setChatLogs(chatData);
    //gửi event đã đọc tin nhắn
    if (receiver?.userId) readMessage(receiver.userId);
  }, [chatData]);

  //signalR events
  useEffect(() => {
    //event nhận được tin nhắn từ người đang chọn hoặc bản thân
    const cb = (msg: GetMessagesRes) => {
      if (
        msg.senderId === receiverId.current ||
        msg.receiverId === receiverId.current
      ) {
        setChatLogs((x) => [...x, msg]);
      }
    };
    onMessageReceived(cb);

    return () => {
      unBindEvent("onNewMessage", cb);
    };
  }, []);

  //scroll to bottom
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    var container = chatContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [chatLogs]);

  const getTime = (s: string) => {
    var h = s.split("T")[1];
    var t = h.substring(0, 5);
    return t;
  };

  const getDate = (s: string) => s.split("T")[0];

  const onSubmitMsg = (e: FormEvent<HTMLFormElement>) => {
    if (!msg) return;

    e.preventDefault();
    if (receiver?.userId) sendMessage(msg, receiver.userId);
    setMsg("");
  };

  if (!receiver)
    return (
      <div className="flex items-center justify-center h-full">
        <h1 className="text-2xl font-bold">
          Chọn từ danh sách liên hệ để xem tin nhắn
        </h1>
      </div>
    );

  return (
    <div className="p-3 h-full flex flex-col">
      <div className="flex items-center">
        <div className="relative">
          <DefaultImage
            img={receiver.avatar}
            fallback="/avatar.webp"
            className={`w-14 h-14 rounded-full cursor-pointer`}
            custom="w-[50px] h-[50px]"
          />

          <div
            className={`${
              receiver.isOnline ? "bg-green-500" : "bg-slate-500"
            } absolute right-0 bottom-0 h-[15px] w-[15px] rounded-full`}
          ></div>
        </div>

        <div className="text-xl font-bold mx-4 flex-1 whitespace-nowrap">
          {receiver.name}
        </div>

        <div className="text-slate-500">{receiver.title}</div>
      </div>
      <hr className="my-4" />
      <div className="flex-1 overflow-y-auto px-3 mb-3" ref={chatContainerRef}>
        {chatLogs &&
          chatLogs.map((x, i) => (
            <div key={i}>
              {/* dates */}
              {(i == 0 || getDate(x.time) > getDate(chatLogs[i - 1].time)) && (
                <div className="text-center text-gray-500 my-2">
                  {toDMY(getDate(x.time))}
                </div>
              )}

              {/* message */}
              <div
                className={`${
                  x.senderId == receiver.userId
                    ? "justify-start"
                    : "justify-end"
                } flex`}
              >
                <div className="group">
                  <div
                    className={`${
                      x.senderId == receiver.userId
                        ? "bg-slate-200"
                        : "bg-blue-400 text-white"
                    } rounded-[999px] py-3 px-5`}
                  >
                    {x.message}
                  </div>
                  <div className="flex justify-end text-sm text-gray-500 invisible group-hover:visible">
                    <div className="mr-4">{getTime(x.time)}</div>
                  </div>
                </div>
              </div>

              {/* last seen */}
              {x.time <= receiver.lastSeen &&
                (i == chatLogs.length - 1 ||
                  chatLogs[i + 1].time > receiver.lastSeen) && (
                  <div className="flex justify-center relative mb-3">
                    <div className="bg-slate-500 text-white px-3 py-1 rounded-[999px] text-sm z-10">
                      Đã xem
                    </div>
                    <div className="absolute w-full top-[50%] left-0">
                      <hr />
                    </div>
                  </div>
                )}
            </div>
          ))}

        {!chatLogs?.length && (
          <div>
            <h1 className="text-center">
              Chưa có tin nhắn, hãy bắt đầu nhắn tin
            </h1>
          </div>
        )}
      </div>

      <form onSubmit={onSubmitMsg}>
        <div className="flex h-[50px] bg-slate-300 rounded-xl overflow-hidden pr-5">
          <input
            type="text"
            className="bg-inherit flex-1 pl-3 placeholder:text-black outline-none"
            placeholder="Nhập tin nhắn..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button title="Gửi">
            <FaPaperPlane className="text-blue-400 hover:text-blue-500" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Message;
