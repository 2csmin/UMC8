import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      id="sidebar"
      className="bg-gray-900 text-white w-50 h-screen p-4 fixed top-[60px] z-50 left-0 transition-transform duration-300"
    >
      <nav className="flex flex-col gap-3">
        <button className="text-left p-2 hover:text-pink-500">🔍 찾기</button>
        <Link to="/my" className="p-2 block hover:text-pink-500">
          👤 마이페이지
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
