import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";

export const UserForm = ({ newUser, setNewUser, handleAddUser }) => {
  return (
    <form className="py-4" dir="ltr">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-md font-medium text-gray-700 block">First Name</label>
          <Input 
            className="w-full rounded-md border-gray-300 text-sm" 
            value={newUser.firstname} 
            onChange={e => setNewUser({ ...newUser, firstname: e.target.value })} 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-md font-medium text-gray-700 block">Last Name</label>
          <Input 
            className="w-full rounded-md border-gray-300 text-sm" 
            value={newUser.lastname} 
            onChange={e => setNewUser({ ...newUser, lastname: e.target.value })} 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-md font-medium text-gray-700 block">Email</label>
          <Input 
            className="w-full rounded-md border-gray-300 text-sm" 
            type="email"
            value={newUser.email} 
            onChange={e => setNewUser({ ...newUser, email: e.target.value })} 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-md font-medium text-gray-700 block">Phone Number</label>
          <Input 
            className="w-full rounded-md border-gray-300 text-sm" 
            type="tel"
            value={newUser.phone} 
            onChange={e => setNewUser({ ...newUser, phone: e.target.value })} 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-md font-medium text-gray-700 block">Password</label>
          <Input 
            className="w-full rounded-md border-gray-300 text-sm" 
            type="password"
            value={newUser.password} 
            onChange={e => setNewUser({ ...newUser, password: e.target.value })} 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-md font-medium text-gray-700 block">Role</label>
          <select 
            className="w-full p-2 rounded-md border border-gray-300 bg-white text-left text-sm"
            value={newUser.role} 
            onChange={e => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="receptionist">Receptionist</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label className="text-md font-medium text-gray-700 block">Status</label>
          <select 
            className="w-full md:w-1/2 p-2 rounded-md border border-gray-300 bg-white text-left text-sm"
            value={newUser.is_active} 
            onChange={e => setNewUser({ ...newUser, is_active: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      
      <DialogFooter className="mt-6 flex justify-end">
        <Button 
          type="button" 
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
          onClick={handleAddUser}
        >
          <UserPlus size={18} className="ml-2" />
          Add New User
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UserForm;