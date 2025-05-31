import { Button } from "@/components/ui/button";
import { Calendar, Heart, Phone, MapPin, Waves } from "lucide-react";

export default function SimpleClinicHomepage() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="rounded-full bg-blue-100 p-3 mb-6">
            <Heart className="h-8 w-8 text-blue-600" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-900 mb-6">
            Welcome to Our Healthcare Clinic
          </h1>
          
          <p className="text-xl text-blue-700 max-w-3xl mb-10">
            Dedicated to providing compassionate and high-quality medical care for you and your family.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-xl shadow-lg transition-all duration-300">
              Book an Appointment
            </Button>
            <Button variant="outline" className="px-8 py-6 border-2 border-blue-600 text-blue-700 hover:bg-blue-50 text-lg rounded-xl transition-all duration-300">
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="w-full overflow-hidden">
               <Waves className="w-full h-16 text-blue-50" />

      </div>

      {/* Quick Contact */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="rounded-full bg-blue-100 p-4 mb-4">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Contact Us</h3>
              <p className="text-blue-700">+1 (555) 123-4567</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="rounded-full bg-blue-100 p-4 mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Working Hours</h3>
              <p className="text-blue-700">Mon-Fri: 8am - 6pm</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="rounded-full bg-blue-100 p-4 mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Find Us</h3>
              <p className="text-blue-700">123 Health Street, Medical District</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Heart className="h-8 w-8 text-white" />
              <span className="ml-2 text-2xl font-bold">HealthCare Clinic</span>
            </div>
            <p>&copy; 2025 HealthCare Clinic - All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}