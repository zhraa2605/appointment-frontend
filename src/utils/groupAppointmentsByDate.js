
export default function groupAppointmentsByDate(appointments) {
    const grouped = appointments.reduce((groups, appointment) => {
      const date = appointment.date
        ? new Date(appointment.date).toLocaleDateString()
        : "Unscheduled";
      if (!groups[date]) groups[date] = [];
      groups[date].push(appointment);
      return groups;
    }, {});
  
    const sortedDates = Object.keys(grouped).sort((a, b) => {
      if (a === "Unscheduled") return 1;
      if (b === "Unscheduled") return -1;
      return new Date(a) - new Date(b);
    });
  
    return { grouped, sortedDates };
  }
  