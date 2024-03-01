import Image from "next/image";

export const DeleteActionIcon = (
  <Image
    title="Xoá"
    src={"/icons/delete.webp"}
    alt="Detail"
    width={26}
    height={26}
    priority
    className="hover:scale-110 transition-all"
  />
);

export const EditActionIcon = (
  <Image
    title="Chỉnh sửa"
    src={"/icons/edit.webp"}
    alt="Edit"
    width={26}
    height={26}
    priority
    className="hover:scale-110 transition-all"
  />
);
