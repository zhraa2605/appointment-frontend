import { Card, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, Mail, Phone, Calendar, FileText, Clock, User } from "lucide-react";

const DoctorCard = ({ doctor, onEdit, onDelete, isAdmin }) => {
  const user = doctor.user;
  
  const getInitials = () => {
    if (!user) return "DR";
    return `${user.firstname?.[0] || ''}${user.lastname?.[0] || ''}`.toUpperCase();
  };
  
  // Format the bio text
  const formatBio = (bio) => {
    if (!bio) return "No biography provided for this doctor.";
    return bio.length > 120 ? `${bio.substring(0, 120)}...` : bio;
  };
  
  return (
    <Card className="overflow-hidden relative shadow-lg hover:shadow-xl transition-all duration-300 border-gray-100 group">
      {/* Color accent top bar */}
      <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
      
      {/* Action Buttons for admin */}
      {isAdmin && (
        <div className="absolute top-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(doctor)}
            className="bg-white hover:bg-blue-100 text-blue-600 rounded-full shadow-sm"
          >
            <Pencil size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(doctor._id)}
            className="bg-white hover:bg-red-100 text-red-600 rounded-full shadow-sm"
          >
            <Trash size={16} />
          </Button>
        </div>
      )}
      
      <div className="flex flex-col p-5 gap-4">
        {/* Avatar Section */}
        <div className="flex justify-center">
          <Avatar className="h-24 w-24 border-4 border-white shadow-md">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-bold text-white">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </div>
        
        {/* Doctor Info Section */}
        <div className="flex flex-col space-y-4">
          <div className="space-y-3">
            <div className="flex flex-col items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">
                {user ? `Dr. ${user.firstname} ${user.lastname}` : "Doctor Name"}
              </h3>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1 my-3 font-medium">
                {doctor.specializaton || "General Practice"}
              </Badge>
            </div>
            
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={16} className="text-blue-500 flex-shrink-0" />
                <span className="text-sm truncate">
                  {user?.email || "doctor@example.com"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={16} className="text-blue-500 flex-shrink-0" />
                <span className="text-sm">
                  {user?.phone || "No phone number"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Bio section */}
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={16} className="text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Biography</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {formatBio(doctor.bio)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer with stats or availability */}
      <CardFooter className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={16} className="text-blue-500" />
          <span className="text-sm">Available for appointments</span>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          className="border-blue-600 text-blue-700 hover:bg-blue-50"
        >
          <Calendar size={16} className="mr-1" />
          Schedule
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;