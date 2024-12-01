import { useNavigate } from "react-router-dom";
import { userStore } from "../../store/userStore";
import EditOrCreateBookModal from "../EditOrCreatebookModal";

export default function Header() {
  const user = userStore((state) => state.user);
  const removeUser = userStore((state) => state.removeUser);
  const navigate = useNavigate();

  return (
    <header className="flex justify-end items-center mb-8 bg-gray-100 rounded-lg text-white p-4">
      <div className="flex gap-4">
        {user && user.isAdmin && <EditOrCreateBookModal />}
        {user.email !== "" && user ? (
          <button
            onClick={() => removeUser()}
            className="flex items-center gap-2 px-4 py-3 bg-red-400 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/")}
            className="flex justify-center gap-2 px-4 py-3 w-full bg-blue-400 text-white rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
