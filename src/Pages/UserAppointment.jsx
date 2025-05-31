import React, { useEffect, useState } from "react";
import { getUserAppointments , getAllAppointments, getDoctorAppointments } from "@/services/AppointmentServices";
import { useUser } from "@/hooks/useUser";
import { useDoctor } from "@/hooks/useDoctor";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import CreateAppointmentForm from "@/components/Appointments/CreateAppointmentForm";
import toast, { Toaster } from "react-hot-toast";
import {
  CalendarPlus,
  CalendarRange,
  Clock,
  Calendar,
  PlusCircle,
  AlertCircle,
  ArrowRightCircle,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AppointmentCard from "@/components/Appointments/AppointmentCard";

const UserAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedView, setSelectedView] = useState("upcoming");
  const [rescheduleData, setRescheduleData] = useState(null);

  const { user, role } = useUser();
  const { doctors, fetchDoctors } = useDoctor();

  const isAdmin = role === "admin";
  const isDoctor = role === "doctor";
  const isUser = role === "user";

  // Function to toggle appointment creation form
  const handleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  // Function to filter appointments
  const filterAppointments = (appointments) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedView === "upcoming") {
      return appointments
        .filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          return appointmentDate >= today;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      return appointments
        .filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          return appointmentDate < today;
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  };

  // Get appointment status based on date
  const getAppointmentStatus = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const appointmentDate = new Date(date);
    appointmentDate.setHours(0, 0, 0, 0);

    if (appointmentDate.getTime() === today.getTime()) {
      return { label: "Today", color: "bg-blue-500 text-white" };
    } else if (appointmentDate > today) {
      return { label: "Upcoming", color: "bg-emerald-500 text-white" };
    } else {
      return { label: "Past", color: "bg-gray-500 text-white" };
    }
  };

  useEffect(() => {
  const fetchAppointments = async () => {
    if (user && user.data.id) {
      setIsLoading(true);

      try {
        let response;

        if (isUser) {
          response = await getUserAppointments(user.data.id);
        }
         else if (isAdmin) {
          response = await getAllAppointments();
        }

        if (response) {
          setAppointments(response.data);
          toast.success("Appointments fetched successfully!");
        }
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        toast.error("Failed to fetch appointments. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  fetchAppointments();
}, [user]);




  const filteredAppointments = filterAppointments(appointments);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Toaster position="top-right" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            My Appointments
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all your scheduled appointments
          </p>
        </div>

        <Button
          onClick={handleFormVisibility}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition duration-200 flex items-center"
        >
          <CalendarPlus className="mr-2 h-4 w-4" />
          Schedule Appointment
        </Button>
      </div>

      {/* View toggle */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setSelectedView("upcoming")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedView === "upcoming"
              ? "bg-white text-blue-700 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setSelectedView("past")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedView === "past"
              ? "bg-white text-blue-700 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Past
        </button>
      </div>

      {/* Appointment form dialog */}
      <Dialog open={isFormVisible} onOpenChange={handleFormVisibility}>
        <DialogContent className="sm:max-w-md bg-white">
          <div className="mb-2">
            <h2 className="text-xl font-semibold text-gray-900">
              Schedule New Appointment
            </h2>
            <p className="text-sm text-gray-500">
              Fill in the details to book your appointment
            </p>
          </div>

          <CreateAppointmentForm
            onAppointmentCreated={() => {
              setIsFormVisible(false);
              // You might want to refresh appointments here
            }}
            doctors={doctors?.data || []}
            user={user}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!rescheduleData}
        onOpenChange={() => setRescheduleData(null)}
      >
        <DialogContent className="sm:max-w-md bg-white">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Reschedule Appointment
            </h2>
            <p className="text-sm text-gray-500">
              Modify the details and confirm.
            </p>
          </div>

          <CreateAppointmentForm
            appointment={rescheduleData} // pass in current appointment
            onAppointmentCreated={() => {
              setRescheduleData(null);
              // Refresh appointments here
            }}
            doctors={doctors?.data || []}
            user={user}
            
            isEditing={true} // You can use this inside the form to change behavior
          />
        </DialogContent>
      </Dialog>

      {/* Appointments content */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          <span className="ml-3 text-gray-600">Loading appointments...</span>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-blue-50 text-blue-500 mb-4">
            <CalendarRange className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {selectedView} appointments
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {selectedView === "upcoming"
              ? "You don't have any upcoming appointments scheduled. Click 'Schedule Appointment' to book one."
              : "You don't have any past appointment records."}
          </p>
          {selectedView === "upcoming" && (
            <Button
              onClick={handleFormVisibility}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Schedule Now
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.map((appointment) => {
            const status = getAppointmentStatus(appointment.date);
            return (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                status={status}
                onReschedule={() => setRescheduleData(appointment)} // <<< This sets the appointment to be rescheduled
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserAppointment;
