// DoctorList.jsx
import DoctorCard from "./DoctorCard";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const DoctorList = ({ doctors, onEdit, onDelete , isAdmin}) => {
  const doctorsData = doctors.data;
  
  if (!doctorsData || doctorsData.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <div className="text-center space-y-4 max-w-md">
          <h3 className="text-xl font-medium text-gray-800">No doctors available</h3>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">
          Medical Team <span className="text-blue-600">({doctorsData.length})</span>
        </h2>

      </div>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {doctorsData.map((doctor) => (
          <DoctorCard
            key={doctor._id}
            doctor={doctor}
            onEdit={onEdit}
            onDelete={onDelete}
            isAdmin={isAdmin}
          />

        ))}
      </div>
    </div>
  );
};

export default DoctorList;