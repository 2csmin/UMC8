import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { accessToken, name, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-20">
      <div className="flex items-center justify-between p-4">
        <button
          className="text-2xl text-gray-900 dark:text-white"
          onClick={onMenuClick}
        >
          ☰
        </button>
        <Link
          to="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          SpinningSpinning Dolimpan
        </Link>
        <div className="space-x-6">
          {!accessToken && (
            <>
              <Link
                to={"/login"}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                로그인
              </Link>
              <Link
                to={"/signup"}
                className="bg-pink-500 text-white px-3 py-2 rounded-md hover:bg-pink-600 transition"
              >
                회원가입
              </Link>
            </>
          )}
          {accessToken && (
            <>
              <span className="text-gray-700 dark:text-gray-300">
                {name}님 반갑습니다.
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
