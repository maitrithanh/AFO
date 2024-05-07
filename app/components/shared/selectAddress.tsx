"use client";

import { useEffect, useMemo, useState } from "react";
import AddItem from "../admin/menu/addItem";
import useFetch from "@/utils/useFetch";
import Province, { District, Ward } from "@/types/province";
import { FaSquareMinus } from "react-icons/fa6";

interface Props {
  setAddress: (addr: string) => void;
  address: string;
  disable?: boolean;
  hideStreet?: boolean;
}

const SelectAddress = ({ setAddress, address, disable, hideStreet }: Props) => {
  const [street, setStreet] = useState("");
  const [province, setProvince] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [ward, setWard] = useState<string>("");

  const { data: provinces } = useFetch<Province[]>(
    "Config/getAddresses?province=" + province
  );

  const districts = useMemo<District[]>(() => {
    return provinces?.find((x) => x.name == province)?.districts ?? [];
  }, [provinces, province]);

  const wards = useMemo<Ward[]>(() => {
    return districts?.find((x) => x.name == district)?.wards ?? [];
  }, [districts, district]);

  useEffect(() => {
    console.log("address", address);
    var arr = address.split("&");
    if (arr.length > 3) {
      setProvince(arr[3]);
      setDistrict(arr[2]);
      setWard(arr[1]);
      setStreet(arr[0]);
    }
  }, []);

  //update address
  useEffect(() => {
    var addr = `${
      street.replace("&", "") ?? ""
    }&${ward}&${district}&${province}`;
    setAddress(addr);
  }, [province, district, ward, street]);

  return (
    <div className="w-full my-2 flex items-center gap-4">
      <Wrapper onDelete={
        () => {
          setProvince('');
          setDistrict('');
          setWard('');
        }
      }
        showDelete={province != ''}
        >
        <AddItem<Province>
          onAdd={(x) => {
            if (x.name == province) return;
            setProvince(x.name);
            setDistrict("");
            setWard("");
          }}
          dataSource={provinces ?? []}
          getName={(x) => x.name}
          getKey={(x) => x.name}
          placeholder={province || "Tỉnh / thành phố"}
          hightLightPlaceholder={province != ""}
          visible
          hideBtn
          disable={disable}
        />
      </Wrapper>

      <Wrapper onDelete={() => {
        setDistrict('');
        setWard('');
      }}
        showDelete={district != ''}
        >
        <AddItem<District>
          onAdd={(x) => {
            if (x.name == district) return;
            setDistrict(x.name);
            setWard("");
          }}
          dataSource={districts}
          getName={(x) => x.name}
          getKey={(x) => x.name}
          placeholder={district || "Quận / huyện"}
          hightLightPlaceholder={district != ""}
          emptyMsg="Vui lòng chọn tỉnh / thành phố"
          visible
          hideBtn
          disable={disable}
        />
      </Wrapper>

      <Wrapper onDelete={() => setWard('')} showDelete={ward != ''}>
        <AddItem<Ward>
          onAdd={(x) => {
            setWard(x.name);
          }}
          dataSource={wards}
          getName={(x) => x.name}
          getKey={(x) => x.name}
          placeholder={ward || "Phường / xã"}
          hightLightPlaceholder={ward != ""}
          emptyMsg="Vui lòng chọn Quận / huyện"
          visible
          hideBtn
          disable={disable}
        />
      </Wrapper>
      {!hideStreet && (
        <div className="flex-[2]">
          <input
            type="text"
            name="address"
            id="Address"
            className={`border p-3 w-full block rounded-md focus-visible:border-main focus-visible:outline-none border-slate-300`}
            placeholder="Số nhà, tên đường"
            required
            onChange={(e) => setStreet(e.target.value)}
            value={street}
            disabled={disable}
          />
        </div>
      )}
    </div>
  );
};

const Wrapper = ({ children, onDelete, showDelete }: {children: JSX.Element, onDelete: () => void, showDelete: boolean}) => { 
  return <div className="relative">
    {children}
    {
      showDelete &&
      <div
        className="absolute top-0 right-2 cursor-pointer text-lg text-gray-500 hover:text-black"
        onClick={onDelete}
      >
        x
      </div>
    }
  </div>
}

export default SelectAddress;
