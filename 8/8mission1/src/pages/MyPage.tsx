import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../assets/lp.jpg";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setData(response);
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-24">
      {data && (
        <div className=" p-10 w-full max-w-md text-center">
          <img
            src={data?.data?.avatar as string}
            alt={"구글 로고"}
            className="w-25 h-25 mx-auto rounded-full border-3 border-white mb-4"
          />
          <h1 className="text-xl font-semibold mb-2">
            {data?.data?.name}님 환영합니다.
          </h1>
          <h1 className="text-sm text-gray-300">{data?.data?.email}</h1>

          <button
            className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition cursor-pointer hover:scale-90"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      )}

      <div className="mt-12 grid grid-cols-3 gap-5">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="w-40 h-40 bg-gray-300  flex items-center justify-center"
          >
            <span className="text-white">🎵</span>
          </div>
        ))}
      </div>

      {/* + 버튼 위치 */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-pink-500 text-white text-3xl rounded-full shadow-lg hover:scale-105 transition"
        onClick={() => setShowModal(true)}
      >
        +
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-10 rounded-lg w-full max-w-sm relative">
            <button
              className="absolute top-4 right-4 text-white text-xl"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <div className="flex flex-col items-center">
              <img
                src="/src/assets/lp.jpg"
                alt="LP"
                className="w-50 h-50 mb-10"
              />

              <input
                type="text"
                placeholder="LP Name"
                className="w-full mb-4 px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
              />
              <input
                type="text"
                placeholder="LP Content"
                className="w-full mb-4 px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
              />
              <div className="flex w-full gap-2 mb-6">
                <input
                  type="text"
                  placeholder="LP Tag"
                  className="flex-1 px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
                />
                <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500">
                  Add
                </button>
              </div>
              <button className="w-full py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
                Add LP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
