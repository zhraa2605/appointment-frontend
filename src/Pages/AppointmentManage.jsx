import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Calendar, RefreshCw, Clock, CheckCircle, XCircle } from "lucide-react";
import AppointmentsList from "@/components/Appointments/AppointmentList";
import { useDoctor } from "@/hooks/useDoctor";
import { getAllAppointments, updateAppointment } from "@/services/AppointmentServices";
import toast, { Toaster } from 'react-hot-toast';

const AppointmentsManage = () => {
  const { loading: doctorsLoading, error: doctorsError, fetchDoctors } = useDoctor();
  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [appointmentsError, setAppointmentsError] = useState(null);
  const [statuses, setStatuses] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  // State for filters
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchAppointments = async () => {
    try {
      setAppointmentsLoading(true);
      
      const params = new URLSearchParams();
      if (filterDate) params.append("date", filterDate);
      if (filterStatus) params.append("status", filterStatus);
      if (sortOrder) params.append("sort", sortOrder);

      const result = await getAllAppointments(params.toString());
      setAppointments(result.data || []);

    } catch (error) {
      setAppointmentsError("Failed to fetch appointments");
      console.error("Error fetching appointments:", error);
    } finally {
      setAppointmentsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, []);

  useEffect(() => {
    // Re-fetch when filters change
    fetchAppointments();
  }, [filterDate, filterStatus, sortOrder]);

  const handleStatusChange = (id, status) => {
    setStatuses((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        status,
      },
    }));
  };

  const handleReasonChange = (id, reason) => {
    setStatuses((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        cancelReason: reason,
      },
    }));
  };

  const handleUpdate = async (appointment) => {
    const { status = appointment.status, cancelReason = "" } = statuses[appointment._id] || {};

    if (status === "cancelled" && !cancelReason.trim()) {
      toast.error("Please provide a reason for cancellation.");
      return;
    }

    try {
      const updated = await updateAppointment(appointment._id, {
        status,
        cancel_reason: status === "cancelled" ? cancelReason : null,
      });

      toast.success("Appointment updated successfully!");
      fetchAppointments();

    } catch (error) {
      console.error("Failed to update appointment", error);
      toast.error("Failed to update appointment");
    }
  };

  const isLoading = doctorsLoading || appointmentsLoading;
  const error = doctorsError || appointmentsError;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8" dir="ltr">
      {/* Header with blue gradient background */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-black my-5">
          Appointments Management
        </h1>

      {/* Filters Section - Collapsible */}
      <div className=" rounded-lg shadow-md mb-6 overflow-hidden">
        <div 
          className="p-4 flex justify-between items-center  text-gray-950 cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        >
          <h2 className="text-lg font-medium flex items-center">
            <RefreshCw size={18} className="mr-2" />
            Filters and Sorting
          </h2>
          <div className="flex items-center">
            {showFilters ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </div>
        </div>

        {/* Collapsible filter panel */}
        {showFilters && (
          <div className="p-5 border-t border-blue-200 bg-blue-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Date filter */}
              <div className="bg-white p-4 rounded-md shadow-sm">
                <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Calendar size={16} className="mr-2 text-blue-500" />
                  Date
                </label>
                <input
                  id="date-filter"
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full border border-blue-200 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Status filter */}
              <div className="bg-white p-4 rounded-md shadow-sm">
                <label htmlFor="status-filter" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Clock size={16} className="mr-2 text-blue-500" />
                  Status
                </label>
                <select
                  id="status-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full border border-blue-200 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Sort order */}
              <div className="bg-white p-4 rounded-md shadow-sm flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
                <button
                  onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
                  className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="flex items-center justify-center">
                    <span>{sortOrder === "asc" ? "Ascending" : "Descending"}</span>
                    {sortOrder === "asc" ? (
                      <ChevronUp size={16} className="ml-2" />
                    ) : (
                      <ChevronDown size={16} className="ml-2" />
                    )}
                  </span>
                </button>
              </div>

              {/* Reset filters */}
              <div className="bg-white p-4 rounded-md shadow-sm flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">Reset</label>
                <button
                  onClick={() => {
                    setFilterDate("");
                    setFilterStatus("");
                    setSortOrder("asc");
                  }}
                  className="mt-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors border border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Appointments List with Enhanced Loading State */}
      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="bg-blue-500 text-white p-4">
          <h2 className="text-lg font-medium">Appointments</h2>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64 bg-white">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-3"></div>
              <p className="text-blue-800 font-medium">Loading appointments...</p>
            </div>
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-white">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <XCircle size={32} className="text-red-600" />
            </div>
            <p className="text-red-600 font-medium text-lg">{error}</p>
            <button 
              onClick={fetchAppointments}
              className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : appointments.length === 0 ? (
          <div className="p-8 text-center bg-white">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <Calendar size={32} className="text-blue-600" />
            </div>
            <p className="text-gray-600 font-medium text-lg">No appointments found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or adding new appointments</p>
          </div>
        ) : (
          <div className="p-6">
            <AppointmentsList
              appointments={appointments}
              statuses={statuses}
              onStatusChange={handleStatusChange}
              onReasonChange={handleReasonChange}
              onUpdate={handleUpdate}
            />
          </div>
        )}
      </div>
      
      <Toaster 
        position="top-center" 
        reverseOrder={false}
      />
    </div>
  );
};

export default AppointmentsManage;