import { useState, useEffect } from "react";
import AddDoctorDialog from "@/components/Doctors/DoctorDialog";
import DoctorList from "@/components/Doctors/DoctorList";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDoctor } from "@/hooks/useDoctor";
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from "../hooks/useUser";


const Doctors = () => {
  const {
    doctors,
    loading,
    error,
    deleteDoctor,
    fetchDoctors,
    createDoctor,
    updateDoctor,
  } = useDoctor();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const { role } = useUser();
  const isAdmin = role === "admin";

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setIsDialogOpen(true);
  };

  const handleDelete = async (doctorId) => {
    await deleteDoctor(doctorId);
    toast.success("Doctor deleted successfully!");
    await fetchDoctors();

  };

  const handleSubmitDoctor = async (formData) => {
    if (selectedDoctor) {
      await updateDoctor({ id: selectedDoctor._id, data: formData });
      toast.success("Doctor updated successfully!");
    } else {
      await createDoctor(formData);
      toast.success("Doctor added successfully!");
    }
    await fetchDoctors();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Doctors</h1>

        {isAdmin && 
          
        <AddDoctorDialog
          open={isDialogOpen}
          setOpen={(open) => {
            setIsDialogOpen(open);
            if (!open) setSelectedDoctor(null);
          }}
          selectedDoctor={selectedDoctor}
          editMode={selectedDoctor !== null}
          onSubmit={handleSubmitDoctor}
        />
        }
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <DoctorList
          doctors={doctors}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isAdmin={isAdmin}
        />
      )}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />    </div>
  );
};

export default Doctors;
