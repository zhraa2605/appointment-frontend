const StatusPicker = ({ status, onChange }) => {
    const statuses = [
      { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-300" },
      { value: "confirmed", label: "Confirmed", color: "bg-green-100 text-green-800 border-green-300" },
      { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800 border-red-300" },
    ];
  
    return (
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-700">Appointment Status</label>
        <div className="flex flex-wrap gap-2">
          {statuses.map((statusOption) => (
            <button
              key={statusOption.value}
              type="button"
              onClick={() => onChange(statusOption.value)}
              className={`px-4 py-2 rounded-md border transition-all flex items-center ${
                status === statusOption.value
                  ? `${statusOption.color} border-2 font-medium`
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <span className={`w-3 h-3 rounded-full mr-2 ${
                statusOption.value === "pending" ? "bg-yellow-500" :
                statusOption.value === "confirmed" ? "bg-green-500" :
                "bg-red-500"
              }`}></span>
              {statusOption.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  export default StatusPicker;