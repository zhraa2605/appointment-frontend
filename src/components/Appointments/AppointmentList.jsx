import { CalendarX } from "lucide-react";
import AppointmentItem from "./AppointmentItem";
import getDayName from "../../utils/GetDayName";
import groupAppointmentsByDate from "../../utils/groupAppointmentsByDate";

const AppointmentsList = ({
  appointments,
  statuses,
  onStatusChange,
  onReasonChange,
  onUpdate,
}) => {
  const { grouped: groupedAppointments, sortedDates } = groupAppointmentsByDate(appointments);

  if (appointments.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
        <CalendarX className="mx-auto h-16 w-16 text-gray-400" />
        <h3 className="mt-4 text-xl font-semibold text-gray-800">No Appointments</h3>
        <p className="mt-2 text-sm text-gray-500">There are currently no scheduled appointments.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8" dir="ltr">
      {sortedDates.map(date => (
        <div key={date} className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-4">
            {date === "Unscheduled"
              ? "Unscheduled Appointments"
              : `Appointments for ${getDayName(date)} (${date})`}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-5 my-2">
            {groupedAppointments[date].map((appointment) => {
              const currentStatus = statuses[appointment._id]?.status || appointment.status;
              const cancelReason =
                statuses[appointment._id]?.cancelReason ??
                (appointment.status === "cancelled" ? appointment.cancel_reason || "" : "");

              return (
                <AppointmentItem
                  key={appointment._id}
                  appointment={appointment}
                  status={currentStatus}
                  cancelReason={cancelReason}
                  onStatusChange={onStatusChange}
                  onReasonChange={onReasonChange}
                  onUpdate={onUpdate}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentsList;