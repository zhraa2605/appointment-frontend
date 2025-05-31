import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PlusCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const INITIAL_DOCTOR_DATA = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  password: "",
  specialization: "",
  bio: "",
};

const AddDoctorDialog = ({
  open,
  setOpen,
  selectedDoctor,
  editMode,
  onSubmit,
}) => {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [doctorData, setDoctorData] = useState(INITIAL_DOCTOR_DATA);

  // Reset form when dialog opens/closes or when edit mode changes
  useEffect(() => {
    if (editMode && selectedDoctor) {
      setDoctorData({
        firstname: selectedDoctor.user?.firstname || "",
        lastname: selectedDoctor.user?.lastname || "",
        email: selectedDoctor.user?.email || "",
        phone: selectedDoctor.user?.phone || "",
        password: "", // Don't populate password in edit mode
        specialization: selectedDoctor.specialization || "",
        bio: selectedDoctor.bio || "",
      });
    } else if (!editMode) {
      setDoctorData(INITIAL_DOCTOR_DATA);
    }

    // Clear error when dialog opens/closes
    setFormError(null);
  }, [editMode, selectedDoctor, open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null);

    try {
      await onSubmit(doctorData);
      setOpen(false);
      toast.success(
        editMode ? "Doctor updated successfully!" : "Doctor added successfully!"
      );
    } catch (err) {
      console.error("Error saving doctor data:", err);
      setFormError(err?.message || "Something went wrong. Please try again.");
      toast.error(err?.message || "Error occurred while saving doctor data.");
    } finally {
      setLoading(false);
    }
  };

  // Define form fields based on mode
  const formFields = [
    { name: "firstname", label: "First Name", type: "text" },
    { name: "lastname", label: "Last Name", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "specialization", label: "Specialization", type: "text" },
    // Only show password field in add mode
    ...(editMode
      ? []
      : [{ name: "password", label: "Password", type: "password" }]),
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-lg text-white">
          <PlusCircle className="h-5 w-5" />{" "}
          {editMode ? "Edit Doctor" : "Add Doctor"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {editMode ? "Edit Doctor" : "Add New Doctor"}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {editMode
              ? "Update the doctor's information below"
              : "Enter the new doctor's details"}
          </DialogDescription>
        </DialogHeader>

        {formError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription className="text-sm">{formError}</AlertDescription>
          </Alert>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {formFields.map(({ name, label, type }) => (
            <div key={name} className="space-y-2">
              <Label htmlFor={name} className="text-sm font-medium">
                {label}
              </Label>
              <Input
                id={name}
                name={name}
                type={type}
                value={doctorData[name]}
                onChange={handleInputChange}
                placeholder={`Enter ${label.toLowerCase()}`}
                required
                className="text-sm"
              />
            </div>
          ))}

          <div className="space-y-2 col-span-2">
            <Label htmlFor="bio" className="text-sm font-medium">
              Biography
            </Label>
            <Textarea
              id="bio"
              name="bio"
              value={doctorData.bio}
              onChange={handleInputChange}
              className="min-h-[120px] text-sm"
              placeholder="Doctor's biography, credentials and experience"
            />
          </div>

          <div className="col-span-2">
            <DialogFooter className="mt-6 space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="text-sm"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className={`${
                  !editMode
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }  text-white text-sm`}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {editMode ? "Updating..." : "Saving..."}
                  </>
                ) : editMode ? (
                  "Update Doctor"
                ) : (
                  "Add Doctor"
                )}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
      <Toaster position="top-center" />
    </Dialog>
  );
};

export default AddDoctorDialog;
