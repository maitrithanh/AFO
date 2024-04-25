import DefaultImage from "@/app/components/shared/defaultImage";
import { useGlobalContext } from "@/app/contexts/GlobalContext";
import GetMessagesRes from "@/types/GetMessagesRes";
import callApi, { baseURL, callApiWithToken } from "@/utils/callApi";
import { toDMY } from "@/utils/dateTime";
import { getImageUrl } from "@/utils/image";
import {
  ContactListData,
  onMessageReceived,
  onNewReaction,
  readMessage,
  sendMessage,
  sendReaction,
  unBindEvent,
} from "@/utils/signalr/chatHub";
import useFetch from "@/utils/useFetch";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { FaDownload, FaPaperPlane, FaUpload } from "react-icons/fa6";
import { MdFilePresent } from "react-icons/md";

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
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [reachedTop, setReachedTop] = useState(false); //đã đọc hết tin nhắn
  const [scrollPosition, setScrollPosition] = useState(0); //scroll distance from bottom

  const { data: reactions } = useFetch<string[]>("Chat/listReactions");

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
        const element = chatContainerRef.current;
        if (element)
          setScrollPosition(element.scrollHeight - element.scrollTop);

        setChatLogs((x) => [...x, msg]);
      }
    };
    onMessageReceived(cb);

    return () => {
      unBindEvent("onNewMessage", cb);
    };
  }, []);

  useEffect(() => {
    const cbReaction = (data: { msgId: number; reaction: string }) => {
      if (!chatLogs.find((x) => x.msgId === data.msgId)) return;
      setChatLogs((x) =>
        x.map((y) =>
          y.msgId === data.msgId ? { ...y, reaction: data.reaction } : y
        )
      );
    };
    onNewReaction(cbReaction);

    return () => {
      unBindEvent("onNewReaction", cbReaction);
    };
  }, [chatLogs]);

  //on change chat
  useEffect(() => {
    setReachedTop(false);
    setScrollPosition(0);
  }, [currChat]);

  //scroll to bottom
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    var container = chatContainerRef.current;
    if (!container) return;

    //alert(scrollPosition);
    container.scrollTop = container.scrollHeight - scrollPosition;
  }, [
    chatContainerRef.current?.scrollHeight,
    currChat,
    loadingMsg,
    scrollPosition,
  ]);

  //sticky message
  useEffect(() => {});

  //loading more message
  useEffect(() => {
    const element = chatContainerRef.current;

    var timer: any;
    const onScroll = () => {
      if (!element || loadingMsg) return;

      if (reachedTop) {
        element.removeEventListener("scroll", onScroll);
        return;
      }

      const scrollHeight = element.scrollHeight;
      //const clientHeight = element.clientHeight;
      const scrollTop = element.scrollTop;

      setScrollPosition(scrollHeight - scrollTop);

      if ((scrollTop / scrollHeight) * 100 <= 20) {
        clearTimeout(timer);

        timer = setTimeout(() => {
          setLoadingMsg(true);
          callApiWithToken()
            .get(`chat/getChatLog/${receiverId.current}`, {
              params: { skip: chatLogs.length },
            })
            .then((res) => {
              var data = res.data.data as GetMessagesRes[];
              if (!data.length) {
                setReachedTop(true);
              } else {
                setChatLogs((x) => [...data, ...x]);
              }
              setLoadingMsg(false);
            });
        }, 200);
      }
    };

    if (element) {
      element.addEventListener("scroll", onScroll);

      // Cleanup function to remove event listener on unmount
      return () => element.removeEventListener("scroll", onScroll);
    }
  }, [chatContainerRef, chatLogs, loadingMsg, receiverId, setReachedTop]);

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

  const onReact = (
    chatId: number,
    reaction: string | null,
    currReaction: string | null
  ) => {
    if (reaction == currReaction) reaction = null;
    sendReaction(chatId, reaction);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var file: Blob = event.target.files![0];
    if (!file) return;
    // const formData = new FormData();
    // if (file) formData.append("file", file, undefined);

    if (!receiver?.userId) return;
    callApiWithToken().post(
      "Chat/SendFile/" + receiver?.userId,
      { file },
      { headers: { "content-type": "multipart/form-data" } }
    );
  };

  const fileIsImage = (name?: string) => {
    if (!name) return false;
    return name.match(/\.(jpg|jpeg|png)$/i);
  };

  return (
    <div className="p-3 h-full flex flex-col">
      <div className="flex items-center">
        <div className="relative">
          <DefaultImage
            img={getImageUrl(receiver.avatar)}
            fallback="/avatar.webp"
            className={`w-14 h-14 rounded-full cursor-pointer`}
            custom="w-[50px] h-[50px]"
          />

          <div
            className={`${
              receiver.isOnline
                ? "bg-green-500 border-2 border-white"
                : "bg-gray-200 border-2 border-white"
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
        {chatLogs?.length > 0 && !loadingMsg && (
          <div className="text-center bg-gray-200 rounded-[999px] py-1  my-2 text-gray-500">
            Bạn đã xem hết tin nhắn
          </div>
        )}
        {chatLogs?.map((x, i) => (
          <div key={x.msgId}>
            {/* dates */}
            {(i == 0 || getDate(x.time) > getDate(chatLogs[i - 1].time)) && (
              <div className="text-center text-gray-500 my-2">
                {toDMY(getDate(x.time))}
              </div>
            )}

            {/* message */}
            <div
              className={`${
                x.senderId == receiver.userId ? "" : "flex-row-reverse"
              } flex mb-5 items-center group`}
            >
              {/* content */}
              <div className={`relative`}>
                {fileIsImage(x.filePath) ? (
                  // content is image
                  <img
                    title={x.filePath}
                    src={getImageUrl(x.filePath)}
                    className="max-w-[300px] max-h-[300px] rounded-xl"
                  />
                ) : (
                  <div
                    className={`${
                      x.senderId == receiver.userId
                        ? "bg-[#f0f0f0] text-black"
                        : "bg-main text-white"
                    }  rounded-3xl py-3 px-5 max-w-[500px] break-words `}
                  >
                    {x.filePath ? (
                      //content is downloadable file
                      <a
                        href={`${baseURL}File/GetFile/${x.filePath}`}
                        target="_blank"
                      >
                        <div className="cursor-pointer">
                          <FaDownload className="inline me-2" />
                          {x.filePath}
                        </div>
                      </a>
                    ) : (
                      //content is text
                      x.message
                    )}
                  </div>
                )}

                {/* current reaction */}
                {x.reaction && (
                  <DefaultImage
                    key={x.reaction}
                    img={getImageUrl(x.reaction)}
                    fallback="/avatar.webp"
                    custom="w-[20px] h-[20px] absolute right-0 bottom-0 translate-y-[50%]"
                  />
                )}
              </div>

              <div className="text-sm ms-3 text-gray-500 invisible group-hover:visible">
                {/* time */}
                <div className="mr-4 mb-1">{getTime(x.time)}</div>

                {/* reactions */}
                {x.senderId == receiver.userId && (
                  <div className="flex">
                    {reactions?.map((y) => (
                      <div
                        key={y}
                        className={`${
                          y == x.reaction ? "bg-slate-300" : ""
                        } p-[2px] rounded-md me-1`}
                      >
                        <DefaultImage
                          img={getImageUrl(y)}
                          fallback="/avatar.webp"
                          custom={"w-[28px] h-[28px] cursor-pointer"}
                          onClick={() => onReact(x.msgId, y, x.reaction)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-1"></div>
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
        <div className="flex items-center w-full">
          <div className="flex h-[50px] bg-gray-100 rounded-xl overflow-hidden pr-5 items-center w-full">
            <input
              type="text"
              className="bg-inherit flex-1 pl-3 placeholder:text-black outline-none"
              placeholder="Nhập tin nhắn..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />

            <label
              htmlFor="file"
              title="Gửi File"
              className="cursor-pointer text-main"
            >
              <MdFilePresent size={24} />
            </label>
            <input
              title="file"
              id="file"
              type="file"
              className="hidden"
              onChange={onFileChange}
            />
          </div>
          <div className="flex justify-center items-center p-x">
            <button title="Gửi" className="p-2">
              <FaPaperPlane
                className="text-main hover:text-mainBlur w-14"
                size={20}
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Message;
