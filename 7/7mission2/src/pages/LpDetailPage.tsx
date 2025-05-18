import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { Heart } from "lucide-react";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const { accessToken } = useAuth();

  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) });

  const { data: me } = useGetMyInfo(accessToken);
  // mutate -> 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업 처리함.
  // mutateAsync -> Promise를 반환해서 await 사용 가능
  const { mutate: likeMutate, mutateAsync } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  // const isLiked = lp?.data.likes
  //   .map((like) => like.userId)
  //   .includes(me?.data.id as number);

  const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id);

  const handleLikeLp = () => {
    likeMutate({ lpId: Number(lpId) });
  };

  const handleDislikeLp = () => {
    disLikeMutate({ lpId: Number(lpId) });
  };

  if (isPending) {
    return <div className="mt-12">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-12">Error</div>;
  }

  return (
    <div>
      <div className="p-6 flex justify-center">
        <div className="max-w-2xl w-full bg-gray-800 text-white rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{lp?.data.title}</h2>
            <div className="flex gap-2">
              <button className="text-gray-400 hover:text-white">
                ✏️ 수정
              </button>
              <button className="text-gray-400 hover:text-white">
                🗑️ 삭제
              </button>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <img
              src={lp?.data.thumbnail}
              alt={lp?.data.title}
              className="rounded-lg w-64 h-64 object-cover"
            />
          </div>
          <p className="text-sm text-gray-300 mb-4">
            {lp?.data.content || "내용 없음"}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {lp?.data.tags?.map((tag) => (
              <span
                key={tag.id}
                className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded"
              >
                #{tag.name}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={isLiked ? handleDislikeLp : handleLikeLp}>
              <Heart
                color={isLiked ? "red" : "black"}
                fill={isLiked ? "red" : "transparent"}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;
