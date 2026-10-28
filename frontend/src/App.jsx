import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageShell from './components/layout/PageShell';
import LandingPage from './pages/Landing/LandingPage';
import DoctorsPage from './pages/Doctors/DoctorsPage';
import DoctorProfilePage from './pages/DoctorProfile/DoctorProfilePage';
import BookingPage from './pages/Booking/BookingPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import PatientDashboard from './pages/Dashboard/PatientDashboard';
import DoctorDashboard from './pages/Dashboard/DoctorDashboard';
import ConsultRoom from './pages/Consult/ConsultRoom';
import NotFoundPage from './pages/NotFound/NotFoundPage';

const App = () => (
  <Routes>
    <Route element={<PageShell />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/doctors" element={<DoctorsPage />} />
      <Route path="/doctors/:id" element={<DoctorProfilePage />} />
      <Route path="/book/:doctorId" element={<BookingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard/patient" element={<PatientDashboard />} />
      <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
      <Route path="/consult/:roomId" element={<ConsultRoom />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default App;
