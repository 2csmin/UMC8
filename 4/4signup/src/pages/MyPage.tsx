import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setData(response);
    };

    getData();
  }, []);

  return (
    <div>
      {data ? (
        <>
          <div>이름: {data.data.name}</div>
          <div>이메일: {data.data.email}</div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MyPage;
