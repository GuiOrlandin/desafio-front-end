import { usersQuery } from "../../services/getAllUser";
import Header from "../../components/header";
import DeleteModal from "../../components/deleteModal";
import { deleteUserMutate } from "../../services/deleteUser";
import { useState } from "react";
import { updateUserAdminMutate } from "../../services/updateRoleAdmin";

export default function AdminProfile() {
  const { data, isSuccess } = usersQuery();
  const { mutate, isSuccess: userDeleted } = deleteUserMutate();

  const { mutate: updateAdminRole, isSuccess: userUpdated } =
    updateUserAdminMutate();

  const [selectedAdmin, setSelectedAdmin] = useState<Record<string, string>>(
    {}
  );
  const [isButtonEnabled, setIsButtonEnabled] = useState<
    Record<string, boolean>
  >({});

  function handleAdminChange(userId: string, value: string) {
    setSelectedAdmin((prev) => ({ ...prev, [userId]: value }));
    setIsButtonEnabled((prev) => ({ ...prev, [userId]: true }));
  }

  async function handleSaveAdmin(userId: string) {
    const isAdmin = selectedAdmin[userId] === "true";

    updateAdminRole({
      userId,
      isAdmin,
    });
    setIsButtonEnabled((prev) => ({ ...prev, [userId]: false }));
  }

  function handleDeleteUser(userId: string) {
    mutate(userId);
  }

  return (
    <div className="flex flex-col px-24 py-12 bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-4xl mt-6 mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Perfil do Administrador
        </h1>

        {!isSuccess ? (
          <p>Carregando usuários...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                    Email
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                    ID
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                    Admin
                  </th>
                  <th className="py-3 px-6 text-center text-sm font-medium text-gray-700">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="py-3 px-6 text-sm text-gray-800">
                        {user.email}
                      </td>
                      <td className="py-3 px-6 text-sm text-gray-800">
                        {user.id}
                      </td>
                      <td className="py-3 px-6 text-sm text-gray-800">
                        <select
                          value={
                            selectedAdmin[user.id] ?? user.isAdmin.toString()
                          }
                          onChange={(e) =>
                            handleAdminChange(user.id, e.target.value)
                          }
                          className="border rounded px-2 py-1"
                        >
                          <option value="true">Verdadeiro</option>
                          <option value="false">Falso</option>
                        </select>
                      </td>
                      <td className="py-3 px-6 text-center flex gap-2">
                        <button
                          onClick={() => handleSaveAdmin(user.id)}
                          disabled={!isButtonEnabled[user.id]}
                          className={`px-4 py-2 text-white rounded-lg ${
                            isButtonEnabled[user.id]
                              ? "bg-blue-500 hover:bg-blue-700"
                              : "bg-gray-400 cursor-not-allowed"
                          }`}
                        >
                          Salvar
                        </button>
                        <DeleteModal
                          actionFunction={() => handleDeleteUser(user.id)}
                          component="adminProfile"
                          success={userDeleted}
                          title="Você tem certeza que deseja deletar este usuário?"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
