import React from "react";
import { Calendar, Clock, CheckCheck, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import getDayName from "@/utils/GetDayName";

const statusConfig = {
  confirmed: { 
    bg: "bg-emerald-50", 
    text: "text-emerald-700",
    icon: <CheckCheck className="w-4 h-4 mr-2" />
  },
  cancelled: { 
    bg: "bg-red-50", 
    text: "text-red-700",
    icon: <X className="w-4 h-4 mr-2" />
  },
  pending: { 
    bg: "bg-amber-50", 
    text: "text-amber-700",
    icon: <Clock className="w-4 h-4 mr-2" />
  },
};

const AppointmentCard = ({ appointment, onReschedule }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const status = appointment.status || "pending";
  const statusProps = statusConfig[status] || statusConfig.pending;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className={`px-4 py-3 flex justify-between items-center ${statusProps.bg}`}>
        <h3 className="font-medium">
          Dr. {appointment.doctor?.user?.firstname}{" "}
          {appointment.doctor?.user?.lastname}
        </h3>
        <Badge
          variant="outline"
          className={`flex items-center ${statusProps.bg} ${statusProps.text} border-0 text-xs font-medium`}
        >
          {statusProps.icon}
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-800 font-medium">
            {formatDate(appointment.date)} ({getDayName(appointment.date)})
          </span>
        </div>

        <div className="flex items-center">
          <Clock className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-800 font-medium">
            {appointment.time || "Time not specified"}
          </span>
        </div>

        {appointment.doctor?.specialization && (
          <div>
            <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full">
              {appointment.doctor.specialization}
            </span>
          </div>
        )}
      </div>

      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          className="text-blue-600 border-blue-200 hover:bg-blue-50"
          onClick={onReschedule}
        >
          Reschedule
        </Button>
      </div>
    </div>
  );
};

export default AppointmentCard;