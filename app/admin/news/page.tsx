"use client";

import TableTemplate, {
  TableTemplateColumn,
} from "@/app/components/shared/TableTemplate";
import { callApiWithToken } from "@/utils/callApi";
import { getImageUrl } from "@/utils/image";
import useFetch from "@/utils/useFetch";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiTwotoneDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Columns: TableTemplateColumn[] = [
  {
    title: "Hình thu nhỏ",
    getData: (x) =>
      x.image ? (
        <img
          src={getImageUrl(x.image)}
          alt={x.title}
          className="rounded-md min-h-[100px] h-[100px] min-w-[200px] w-[200px]"
        />
      ) : (
        <Image
          src={"/news/default-thumb.webp"}
          alt={"Default Thumbnails"}
          width={200}
          height={150}
        />
      ),
  },
  {
    title: "Tiêu đề",
    getData: (x) => <p className="w-[250px]">{x.title}</p>,
  },
  {
    title: "Nội dung",
    getData: (x) => (
      <p
        className="descriptNewsTable text-justify w-[290px]"
        dangerouslySetInnerHTML={{ __html: x.content }}
      ></p>
    ),
  },
  {
    title: "Ngày đăng",
    getData: (x) => x.dateCreated,
  },
];

const NewsPage = () => {
  const [refresh, setRefresh] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [idPost, setIdPost] = useState("");
  const [titlePost, setTitlePost] = useState("");
  const { data: newsData } = useFetch(`News/getNews`, refresh);

  //Khi update tự động cập nhật
  const handleRefresh = () => {
    setRefresh(true);
    if (refresh) {
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }
  };

  //xoá bài đăng theo id
  const DeletePost = (id: string) => {
    callApiWithToken()
      .delete(`News/deleteNew?id=${id}`)
      .then((response) => {
        toast.success(`Xoá thành công`);
        handleRefresh();
      })
      .catch((error) => {
        toast.error("Có lỗi xảy ra");
      });
  };

  //xử lý đóng/mở dialog xoá
  const handleOpenDialog = (id: string, title: string) => {
    setIdPost(id);
    setTitlePost(title);
    setOpenDialog(true);
  };
  return (
    <>
      <AlertDialog
        onOpenChange={() => {
          setOpenDialog((curr) => !curr);
        }}
        open={openDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn xoá bài đăng?</AlertDialogTitle>
            <AlertDialogDescription className="text-rose-600 font-bold">
              {titlePost}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction
              className="bg-rose-600 hover:bg-rose-900"
              onClick={() => {
                DeletePost(idPost);
              }}
            >
              Xác nhận xoá
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TableTemplate
        title="Tin tức"
        dataSource={newsData || []}
        columns={Columns}
        searchColumns={[Columns[0]]}
        searchPlaceHolder="Tìm kiếm..."
        addButton={{ link: "/admin/news/add-news" }}
        actions={[
          {
            icon: (
              <span className="text-gray-600" title="Chỉnh sửa bài đăng">
                <CiEdit size={24} />
              </span>
            ),
            getLink: (x) => `/admin/news/edit-news/${x.id}`,
          },
          {
            icon: (
              <span className="text-gray-600" title="Xoá bài đăng">
                <AiTwotoneDelete size={24} />
              </span>
            ),
            onClick: (x) => {
              handleOpenDialog(x.id, x.title);
            },
          },
        ]}
      />
    </>
  );
};

export default NewsPage;