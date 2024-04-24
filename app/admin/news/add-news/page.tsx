"use client";
import BackAction from "@/app/components/admin/BackAction";
import Input from "@/app/components/inputs/input";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/app/components/shared/Button";
import { callApiWithToken } from "@/utils/callApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddNewsPage = () => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [value, setValue] = useState("");
  const [currThumb, setCurrThumb] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      content: "",
      image: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    if (currThumb) {
      formData.append("image", currThumb);
    }

    console.log(value);

    callApiWithToken()
      .post(
        `News/postNew?title=${data.title}&content=${value.toString()}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        toast.success("Đăng bài thành công");
        router.push("/admin/news");
      })
      .catch((errors) => {
        console.log(errors);

        toast.error("Có lỗi xảy ra!");
      });
  };

  return (
    <>
      <BackAction />
      <div className=" bg-white shadow-3xl p-4 rounded-md grid grid-cols-4 gap-4">
        <div className=" col-span-3">
          <div className="flex">
            <Input
              id="title"
              register={register}
              errors={errors}
              label="Tiêu đề"
              required
            />
          </div>
          <div className="my-4">
            <p>Nội dung</p>
            <Editor
              textareaName="content"
              id="editor"
              value={value}
              onInit={(evt, editor) => {
                setContent(editor.getContent({ format: "text" }));
              }}
              onEditorChange={(newValue, editor) => {
                setValue(newValue);
                setContent(editor.getContent({ format: "text" }));
              }}
              initialValue=""
              apiKey="zvv7z5v07qqtpspaw2oyjrtw868nqvvb6x1aa9wpzvtoaxul"
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>
        </div>

        <div className="relative">
          <div className=" relative items-center border-2 border-dashed rounded-md h-fit">
            <p className="p-2">Hình thu nhỏ</p>
            <div className=" flex items-center px-2 ">
              {currThumb ? (
                <img
                  src={URL.createObjectURL(currThumb)}
                  alt="Current Avatar"
                  className="w-full rounded-md"
                />
              ) : (
                <img
                  src={"/news/default-thumb.webp"}
                  alt="Current Avatar"
                  className="w-full rounded-md"
                />
              )}
            </div>

            <input
              className="p-4 w-fit"
              type={"file"}
              onChange={(e) => setCurrThumb(e.target.files![0])}
            />
          </div>
          <div className="mt-4 absolute bottom-4 w-full">
            <Button
              label="Đăng tin "
              onClick={handleSubmit(onSubmit)}
              custom=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewsPage;
