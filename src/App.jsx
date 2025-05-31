import SignUpForm from "./components/SignUp";
import EnhancedClinicHomepage from "./Pages/Home";
import AdminDashboard from "./Pages/UserManagement";
import Doctors from "./Pages/Doctors";
import AppointmentsManage from "./Pages/AppointmentManage";
import PrivateRoute from "./components/PrivateRoute";
import { Route , Routes } from "react-router-dom";
import UserAppointment from "./Pages/UserAppointment";
import Header from "./components/Header";

function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<EnhancedClinicHomepage />} />
      <Route path="/login" element={<SignUpForm  hasAccount={true}/>} />
      <Route path="/signup" element={<SignUpForm hasAccount={false} />} />


      <Route element={<PrivateRoute />}>
        <Route path="/admin" element={<AdminDashboard requiredRole="admin" />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointmentmanage" element={<AppointmentsManage requiredRole={["admin" , "doctor"]} />} />
        <Route path="/userappointments" element={<UserAppointment requiredRole={ ["admin" , "user"]}/>} />
      </Route>
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>

    </>
  )
}

export default App;

