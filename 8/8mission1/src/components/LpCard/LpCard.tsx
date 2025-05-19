import { useNavigate } from "react-router-dom";
import { Lp } from "../../types/lp";
import { useAuth } from "../../context/AuthContext";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const handleClick = () => {
    if (accessToken) {
      navigate(`/lps/${lp.id}`);
    } else {
      alert("로그인이 필요한 서비스입니다. 로그인 화면으로 이동합니다.");
      navigate("/login");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="object-cover w-full h-48"
      />
      <div className="absolute inset-0 hover:bg-black/50 transition-all duration-300 flex items-end p-4">
        <div className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-lg font-semibold">{lp.title}</h3>
          <p className="text-sm flex items-center gap-1">
            ❤️ {lp.likes.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LpCard;
