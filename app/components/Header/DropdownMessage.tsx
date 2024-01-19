"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        }}
        href="#"
        className="relative p-2 flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] bg-gray-50 border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        <span
          className={`absolute -top-0.5 right-0 bg-rose-600 z-1 h-2 w-2 rounded-full bg-meta-1 ${
            notifying === false ? "hidden" : "inline"
          }`}
        >
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
        </span>

        <Image src={"/icons/chat.png"} width={24} height={24} alt="" />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        style={{
          background:
            "url(https://png.pngtree.com/background/20210710/original/pngtree-childlike-cartoon-children-s-training-class-enrollment-poster-background-material-picture-image_1034003.jpg)",
          backgroundSize: "cover",
        }}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute mt-2.5 flex h-90 sm:w-[462px] w-[320px] z-50 flex-col rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark right-0  ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4.5 py-2 flex justify-center">
          <h5 className="px-3 py-1 text-xl font-bold flex justify-center items-center bg-main w-fit rounded-full text-white text-cool">
            Tin nhắn
          </h5>
        </div>

        <ul className="flex flex-col overflow-y-auto sm:h-[700px] h-[500px]">
          <li className="">
            <Link
              className="flex items-center mx-4 my-2 p-2 bg-[#ffffff68] rounded-lg gap-4.5 border-[#ff6f0068] border-2 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full mr-2">
                <Image
                  width={55}
                  height={55}
                  src={"/avatar.jpg"}
                  alt="User"
                  className="rounded-full"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white bg-[#F8853E7d] w-fit px-1 rounded-lg">
                  Tên người gửi
                </h6>
                <p className="text-sm max-w-[200px] max-h-[20px] text-ellipsis overflow-hidden">
                  Nội dung nhắn 💪
                </p>
                <p className="text-xs">1 phút trước</p>
              </div>
            </Link>
          </li>
          <li className="">
            <Link
              className="flex items-center mx-4 my-2 p-2 bg-[#ffffff68] rounded-lg gap-4.5 border-[#ff6f0068] border-2 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full mr-2">
                <Image
                  width={55}
                  height={55}
                  src={"/avatar.jpg"}
                  alt="User"
                  className="rounded-full"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white bg-[#F8853E7d] w-fit px-1 rounded-lg">
                  Tên người gửi
                </h6>
                <p className="text-sm max-w-[200px] max-h-[20px] text-ellipsis overflow-hidden">
                  Nội dung nhắn 💪
                </p>
                <p className="text-xs">1 phút trước</p>
              </div>
            </Link>
          </li>
          <li className="">
            <Link
              className="flex items-center mx-4 my-2 p-2 bg-[#ffffff68] rounded-lg gap-4.5 border-[#ff6f0068] border-2 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full mr-2">
                <Image
                  width={55}
                  height={55}
                  src={"/avatar.jpg"}
                  alt="User"
                  className="rounded-full"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white bg-[#F8853E7d] w-fit px-1 rounded-lg">
                  Tên người gửi
                </h6>
                <p className="text-sm max-w-[200px] max-h-[20px] text-ellipsis overflow-hidden">
                  Nội dung nhắn 💪
                </p>
                <p className="text-xs">1 phút trước</p>
              </div>
            </Link>
          </li>
          <li className="">
            <Link
              className="flex items-center mx-4 my-2 p-2 bg-[#ffffff68] rounded-lg gap-4.5 border-[#ff6f0068] border-2 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full mr-2">
                <Image
                  width={55}
                  height={55}
                  src={"/avatar.jpg"}
                  alt="User"
                  className="rounded-full"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white bg-[#F8853E7d] w-fit px-1 rounded-lg">
                  Tên người gửi
                </h6>
                <p className="text-sm max-w-[200px] max-h-[20px] text-ellipsis overflow-hidden">
                  Nội dung nhắn 💪
                </p>
                <p className="text-xs">1 phút trước</p>
              </div>
            </Link>
          </li>
          <li className="">
            <Link
              className="flex items-center mx-4 my-2 p-2 bg-[#ffffff68] rounded-lg gap-4.5 border-[#ff6f0068] border-2 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full mr-2">
                <Image
                  width={55}
                  height={55}
                  src={"/avatar.jpg"}
                  alt="User"
                  className="rounded-full"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white bg-[#F8853E7d] w-fit px-1 rounded-lg">
                  Tên người gửi
                </h6>
                <p className="text-sm max-w-[200px] max-h-[20px] text-ellipsis overflow-hidden">
                  Nội dung nhắn 💪
                </p>
                <p className="text-xs">1 phút trước</p>
              </div>
            </Link>
          </li>
          <li className="">
            <Link
              className="flex items-center mx-4 my-2 p-2 bg-[#ffffff68] rounded-lg gap-4.5 border-[#ff6f0068] border-2 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full mr-2">
                <Image
                  width={55}
                  height={55}
                  src={"/avatar.jpg"}
                  alt="User"
                  className="rounded-full"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white bg-[#F8853E7d] w-fit px-1 rounded-lg">
                  Tên người gửi
                </h6>
                <p className="text-sm max-w-[200px] max-h-[20px] text-ellipsis overflow-hidden">
                  Nội dung nhắn 💪
                </p>
                <p className="text-xs">1 phút trước</p>
              </div>
            </Link>
          </li>
          <li className="">
            <Link
              className="flex items-center mx-4 my-2 p-2 bg-[#ffffff68] rounded-lg gap-4.5 border-[#ff6f0068] border-2 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full mr-2">
                <Image
                  width={55}
                  height={55}
                  src={"/avatar.jpg"}
                  alt="User"
                  className="rounded-full"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white bg-[#F8853E7d] w-fit px-1 rounded-lg">
                  Tên người gửi
                </h6>
                <p className="text-sm max-w-[200px] max-h-[20px] text-ellipsis overflow-hidden">
                  Nội dung nhắn 💪
                </p>
                <p className="text-xs">1 phút trước</p>
              </div>
            </Link>
          </li>
          <li className="">
            <Link
              className="flex items-center mx-4 my-2 p-2 bg-[#ffffff68] rounded-lg gap-4.5 border-[#ff6f0068] border-2 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full mr-2">
                <Image
                  width={55}
                  height={55}
                  src={"/avatar.jpg"}
                  alt="User"
                  className="rounded-full"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white bg-[#F8853E7d] w-fit px-1 rounded-lg">
                  Tên người gửi
                </h6>
                <p className="text-sm max-w-[200px] max-h-[20px] text-ellipsis overflow-hidden">
                  Nội dung nhắn 💪
                </p>
                <p className="text-xs">1 phút trước</p>
              </div>
            </Link>
          </li>
          <li className="">
            <Link
              className="flex items-center mx-4 my-2 p-2 bg-[#ffffff68] rounded-lg gap-4.5 border-[#ff6f0068] border-2 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full mr-2">
                <Image
                  width={55}
                  height={55}
                  src={"/avatar.jpg"}
                  alt="User"
                  className="rounded-full"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white bg-[#F8853E7d] w-fit px-1 rounded-lg">
                  Tên người gửi
                </h6>
                <p className="text-sm max-w-[200px] max-h-[20px] text-ellipsis overflow-hidden">
                  Nội dung nhắn 💪
                </p>
                <p className="text-xs">1 phút trước</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      {/* <!-- Dropdown End --> */}
    </li>
  );
};

export default DropdownMessage;
