import { CheckCheck, X, Clock, User, Calendar, Clock3 } from "lucide-react";

const AppointmentItem = ({
  appointment,
  status,
  cancelReason,
  onStatusChange,
  onReasonChange,
  onUpdate,
}) => {
  // Status configurations for visual styling
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

  // Format date from ISO string
  const formatDate = (dateString) => {
    if (!dateString) return "Date not set";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Extract patient and doctor names
  const patientName = `${appointment.Patient.firstname} ${appointment.Patient.lastname}`;
  const doctorName = appointment.doctor
    ? `Dr. ${appointment.doctor.user.firstname} ${appointment.doctor.user.lastname}`
    : "No doctor assigned";

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden">
      {/* Top status indicator bar */}
      <div className={`h-1 w-full ${statusConfig[status]?.bg || "bg-gray-100"}`}></div>
      
      <div className="p-4">
        {/* Patient name and status badge */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-medium text-gray-900">{patientName}</h2>
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${statusConfig[status]?.bg || "bg-gray-100"} ${statusConfig[status]?.text || "text-gray-700"}`}>
            {statusConfig[status]?.icon}
            {status}
          </span>
        </div>
        
        {/* Doctor and date/time details */}
        <div className="space-y-6 mb-4">
          <div className="flex items-center text-lg text-gray-600">
            <User className="w-4 h-4 text-gray-400 mx-2" />
            <span>{doctorName}</span>
          </div>
          
          <div className="flex items-center text-md text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400 mx-2" />
            <span>{formatDate(appointment.date)}</span>
            {appointment.time && (
              <span className="flex items-center">
                <span className="mx-2 text-gray-300">•</span>
                <Clock3 className="w-4 h-4 text-gray-400 mx-2" />
                <span>{appointment.time}</span>
              </span>
            )}
          </div>
        </div>
        
        {/* Status controls */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center space-x-3">
            <select
              value={status}
              onChange={(e) => onStatusChange(appointment._id, e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-md mt-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              aria-label="Appointment status"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <button
              onClick={() => onUpdate(appointment)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-md font-medium px-4 mt-2 py-2 rounded-md transition flex items-center justify-center"
              aria-label="Update appointment"
            >
              Update
            </button>
          </div>

          {/* Cancellation reason input (conditional) */}
          {status === "cancelled" && (
            <input
              type="text"
              placeholder="Reason for cancellation"
              value={cancelReason}
              onChange={(e) => onReasonChange(appointment._id, e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentItem;