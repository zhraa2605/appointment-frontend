import { useState, useEffect } from "react";
import { createAppointment } from "@/services/AppointmentServices";
import { createReshedule } from "@/services/AppointmentReschedule";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Clock, User, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import toast from "react-hot-toast";
import CreatedDialog from "./CreatedDialog";

const CreateAppointmentForm = ({
  onAppointmentCreated,
  doctors,
  user,
  appointmentData,
  isReschedule = false, // <-- add this default if you want
  isEditing = false,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const [date, setDate] = useState(
    appointmentData?.date ? new Date(appointmentData.date) : null
  );

  const [newAppointment, setNewAppointment] = useState({
    date: appointmentData?.date || "",
    time: appointmentData?.time || "",
    doctorId: appointmentData?.doctorId || "",
    userId: user?.id || "",
    status: "pending",
  });

  useEffect(() => {
    if (user?.data?.id) {
      setNewAppointment((prev) =>
        prev.userId !== user.data.id ? { ...prev, userId: user.data.id } : prev
      );
    }
  }, [user?.data?.id]);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    const formattedDate = selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : "";
    setNewAppointment((prev) => ({ ...prev, date: formattedDate }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleDoctorChange = (value) => {
    setNewAppointment((prev) => ({ ...prev, doctorId: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!newAppointment.doctorId || !newAppointment.userId) {
      const errorMsg = "Doctor or user info missing. Can't proceed.";
      setFormError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    try {
      if (isEditing) {
        await createReshedule({
          appointment_id: appointmentData?.id,
          new_time: newAppointment?.time,
          new_date: newAppointment?.date,
        });
        toast.success("Appointment rescheduled successfully!");
      } else {
        await createAppointment(newAppointment);
        toast.success("Appointment scheduled successfully!");
      }

      setFormSubmitted(true);
      onAppointmentCreated();
      setDate(null);
      setNewAppointment({
        date: "",
        time: "",
        doctorId: "",
        userId: user?.id || "",
        status: "pending",
      });

      setShowConfirmationDialog(true);
      setTimeout(() => setFormSubmitted(false), 3000);
    } catch (error) {
      const msg = `Failed to ${
        isEditing ? "reschedule" : "create"
      } appointment.`;
      setFormError(msg);
      toast.error(msg);
    }
  };

  return (
    <>
      <Card className="overflow-visible border-none shadow-none">
        <CardContent className="pt-3  pb-5">
          {formSubmitted && (
            <Alert className="mb-2 bg-green-50 border-green-200 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <AlertDescription className="text-green-800 font-medium">
                Appointment {isReschedule ? "rescheduled" : "created"}{" "}
                successfully!
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Date Picker */}
            <div className="space-y-2 relative">
              <Label htmlFor="date">Appointment Date</Label>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCalendar(!showCalendar)}
                className={cn(
                  "w-full justify-start text-left font-normal border-slate-300",
                  !newAppointment.date && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {newAppointment.date
                  ? format(newAppointment.date, "PPP")
                  : "Select appointment date"}
              </Button>
              {showCalendar && (
                <div className="absolute z-50 bg-white border rounded-md shadow-lg">
                  <Calendar
                    mode="single"
                    selected={new Date(newAppointment.date)}
                    onSelect={(date) => {
                      handleDateChange(date);
                      setShowCalendar(false);
                    }}
                    className="rounded-md"
                  />
                </div>
              )}
            </div>

            {/* Time Input */}
            <div className="space-y-2">
              <Label htmlFor="time">Appointment Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  type="time"
                  id="time"
                  name="time"
                  value={newAppointment.time}
                  onChange={handleInputChange}
                  className="pl-10 border-slate-300"
                  required
                />
              </div>
            </div>

            {/* Doctor Select - Only shown in create mode */}
            {!isEditing && (
              <div className="space-y-2">
                <Label htmlFor="doctorId">Select Doctor</Label>
                <Select
                  value={newAppointment.doctorId}
                  onValueChange={handleDoctorChange}
                >
                  <SelectTrigger className="border-slate-300 pl-9 relative">
                    <div className="absolute left-3 top-2.5">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                    <SelectValue placeholder="Choose your healthcare provider" />
                  </SelectTrigger>
                  <SelectContent className="max-h-56 overflow-y-auto">
                    {(doctors || [])
                      .filter((doc) => doc.user)
                      .map((doc) => (
                        <SelectItem key={doc._id} value={doc._id}>
                          Dr. {doc.user.firstname} {doc.user.lastname}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </form>
        </CardContent>

        <CardFooter className="bg-gray-50 px-6 py-4 mt-4">
          <Button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!newAppointment.date || !newAppointment.time}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {isEditing ? "Reschedule" : "Schedule"} Appointment
          </Button>
        </CardFooter>
      </Card>

      <CreatedDialog
        setShowConfirmationDialog={setShowConfirmationDialog}
        showConfirmationDialog={showConfirmationDialog}
      />
    </>
  );
};

export default CreateAppointmentForm;
