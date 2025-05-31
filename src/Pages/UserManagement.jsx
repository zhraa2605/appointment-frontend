import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UsersTable from "../components/UserManage/UsersTable ";
import { UserForm } from "@/components/UserManage/UserForm";
import { useUser } from "@/hooks/useUser";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";

const UsersPage = () => {
  const {
    users,
    fetchUsers,
    addUser,
    deleteUser,
    editUser,
  } = useUser();

  const [editingUser, setEditingUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "doctor",
    status: "active",
    phone: "",
    password: "",
  });

  const handleAddUser = async () => {
    try {
      await addUser(newUser);
      await fetchUsers();
      setNewUser({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        role: "user",
        status: "active",
      });
      setDialogOpen(false);
      toast.success("User added successfully!");
    } catch (err) {
      console.error("Failed to add user:", err);
      toast.error("Failed to add user. Please try again.");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      await fetchUsers();
      toast.success("User deleted successfully!");
    } catch (err) {
      console.error("Failed to delete user:", err);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async (id, data) => {
    try {
      await editUser(id, data);
      setEditingUser(null);
      toast.success("User updated successfully!");
      fetchUsers();
    } catch (err) {
      console.error("Failed to update user:", err);
      toast.error("Failed to update user. Please try again.");
    }
  };

  const handleEditChange = (field, value) => {
    setEditingUser((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4" dir="ltr">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold p-4 text-blue-950">User List</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              Add User
              <UserPlus size={18} className="ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg text-center">Add New User</DialogTitle>
            </DialogHeader>
            <UserForm
              newUser={newUser}
              setNewUser={setNewUser}
              handleAddUser={handleAddUser}
            />
          </DialogContent>
        </Dialog>
      </div>

      <UsersTable
        users={users}
        editingUser={editingUser}
        handleEditClick={handleEditClick}
        handleDeleteUser={handleDeleteUser}
        handleUpdateUser={handleUpdateUser}
        handleEditChange={handleEditChange}
      />
    </div>
  );
};

export default UsersPage;