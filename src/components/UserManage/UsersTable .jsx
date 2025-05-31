import { UserRow } from "./UserRow";
import { UserX } from "lucide-react";

const UsersTable = ({
  users,
  editingUser,
  handleEditClick,
  handleDeleteUser,
  handleUpdateUser,
  handleEditChange,
}) => {
  if (!users?.data || users.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-foreground/60">
        <UserX className="h-16 w-16 mb-4 text-primary/30" />

        <p className="text-lg font-medium">No users to display</p>
        <p className="text-sm">Add new users using the "Add User" button</p>
      </div>
    );
  }

  const tableHeaders = [
    "First Name",
    "Last Name",
    "Email",
    "Role",
    "Status",
    "Actions",
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-border" dir="ltr">
        <thead className="bg-muted/50">
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header}
                className="py-3.5 px-4 text-center text-sm font-medium text-foreground/70 tracking-wider bg-blue-50"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-border/60 ">
          {users.data.map((user) => (
            <UserRow
              key={user._id}
              user={user}
              editingUser={editingUser}
              handleEditClick={handleEditClick}
              handleDeleteUser={handleDeleteUser}
              handleUpdateUser={handleUpdateUser}
              handleEditChange={handleEditChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
