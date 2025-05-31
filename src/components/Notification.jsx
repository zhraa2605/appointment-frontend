import { useEffect, useRef, useState } from "react";
import { getNotifications, deleteNotification } from "@/services/NotificationServices";
import { Bell, X } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";

const NotificationBell = () => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const bellRef = useRef(null);

  useEffect(() => {
    if (user?.data?.id) {
      getNotifications(user.data.id).then((data) => {
        setNotifications(data);
        console.log("Notifications fetched:", data);
      });
    }
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Delete notification handler
  const handleDelete = async (id) => {
    await deleteNotification(id);
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  return (
    <div className="relative" ref={bellRef}>
      <Button variant="ghost" onClick={() => setOpen((o) => !o)}>
        <Bell className="w-6 h-6" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
            {notifications.length}
          </span>
        )}
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50">
          <div className="p-4 border-b font-semibold">Notifications</div>
          <ul className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <li className="p-4 text-gray-500">No notifications</li>
            ) : (
              notifications.map((n) => (
                <li key={n._id} className="p-4 border-b last:border-b-0 flex items-center justify-between">
                  <div className="font-medium">{n.message}</div>
                  <button
                    className="ml-4 text-gray-400 hover:text-red-600"
                    onClick={() => handleDelete(n._id)}
                    title="Delete notification"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;