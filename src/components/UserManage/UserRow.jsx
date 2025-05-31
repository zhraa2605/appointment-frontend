import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Save } from "lucide-react";

export const UserRow = ({
  user,
  editingUser,
  handleEditClick,
  handleDeleteUser,
  handleUpdateUser,
  handleEditChange,
}) => {
  const isEditing = editingUser && editingUser._id === user._id;

  return (
    <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50 text-center">
      {isEditing ? (
        <>
          <td className="py-3 px-4">
            <Input
              className="w-full text-right"
              value={editingUser.firstname}
              onChange={(e) => handleEditChange("firstname", e.target.value)}
            />
          </td>
          <td className="py-3 px-4">
            <Input
              className="w-full text-right"
              value={editingUser.lastname}
              onChange={(e) => handleEditChange("lastname", e.target.value)}
            />
          </td>
          <td className="py-3 px-4">
            <Input
              className="w-full text-right"
              value={editingUser.email}
              onChange={(e) => handleEditChange("email", e.target.value)}
            />
          </td>
          <td className="py-3 px-4">
            <select
              className="w-full rounded-md border border-gray-300 p-2 text-center"
              value={editingUser.role}
              onChange={(e) => handleEditChange("role", e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="receptionist">Receptionist</option>
              <option value="doctor">Doctor</option>
            </select>
          </td>
          <td className="py-3 px-4">
            <select
              className="w-full rounded-md border border-gray-300 p-2 text-center"
              value={editingUser.is_active}
              onChange={(e) => handleEditChange("is_active", e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </td>
          <td className="py-3 px-4">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md"
              onClick={() => handleUpdateUser(user._id, editingUser)}
            >
              <Save size={16} className="ml-1" />
              Save
            </Button>
          </td>
        </>
      ) : (
        <>
          <td className="py-3 px-4 text-center">{user.firstname}</td>
          <td className="py-3 px-4 text-center">{user.lastname}</td>
          <td className="py-3 px-4 text-center">{user.email}</td>
          <td className="py-3 px-4 text-center">
            <span className={`px-2 py-1 rounded-full text-[14px] ${
              user.role === 'admin' ? 'bg-purple-200 text-purple-800' :
              user.role === 'doctor' ? 'bg-blue-100 text-blue-800' :
              user.role === 'receptionist' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {user.role === 'admin' ? 'Admin' :
               user.role === 'doctor' ? 'Doctor' :
               user.role === 'receptionist' ? 'Receptionist' :
               'User'}
            </span>
          </td>
          <td className="py-3 px-4 text-center">
            <span className={`px-2 py-1 rounded-full text-[14px] ${
              user.is_active === "active" || user.is_active === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {user.is_active === "active" || user.is_active === true ? "Active" : "Inactive"}
            </span>
          </td>
          <td className="py-3 pl-4 text-center">
            <div className="flex gap-2">
              <Button
                className="bg-blue-700 hover:bg-blue-900 text-white p-2 rounded-md"
                onClick={() => handleEditClick(user)}
              >
                <Pencil size={16} />
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white rounded-md"
                variant="destructive"
                onClick={() => handleDeleteUser(user._id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </td>
        </>
      )}
    </tr>
  );
};

export default UserRow;