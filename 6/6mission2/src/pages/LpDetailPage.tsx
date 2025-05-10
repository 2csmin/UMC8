import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Lp } from "../types/lp";
import axios from "axios";

const LpDetailPage = () => {
  const { LPid } = useParams();
  const { accessToken } = useAuth();
  const [lpData, setLpData] = useState<Lp | null>(null);

  useEffect(() => {
    const fetchLpData = async () => {
      try {
        const response = await axios.get<Lp>(`/api/lp/${LPid}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setLpData(response.data);
      } catch (error) {
        alert("Lp 데이터 로딩 오류");
      }
    };
    fetchLpData();
  }, [LPid, accessToken]);

  if (!lpData) {
    return <p>LP 데이터를 불러올 수 없습니다</p>;
  }

  return (
    <div className="p-6 flex justify-center">
      <div className="max-w-2xl w-full bg-gray-800 text-white rounded-lg p-6 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{lpData?.title}</h2>
          <div className="flex gap-2">
            <button className="text-gray-400 hover:text-white">✏️ 수정</button>
            <button className="text-gray-400 hover:text-white">🗑️ 삭제</button>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <img
            src={lpData?.thumbnail}
            alt={lpData?.title}
            className="rounded-lg w-64 h-64 object-cover"
          />
        </div>
        <p className="text-sm text-gray-300 mb-4">
          {lpData?.content || "내용 없음"}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {lpData?.tags?.map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded"
            >
              #{tag.name}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="text-red-500 hover:text-red-700">❤️</button>
          <span>{lpData.likes ? lpData.likes.length : 0}</span>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;
