import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home.jsx';
import About from '../pages/About/About.jsx';
import Services from '../pages/Services/Services.jsx';
import Contact from '../pages/Contact/Contact.jsx';
import Login from '../pages/Auth/Login.jsx';
import SignUp from '../pages/Auth/SignUp.jsx';
import ParentRegisterPage from '../pages/Register/ParentRegisterPage.tsx';
import ChildRegisterPage from '../pages/Register/ChildRegisterPage.tsx';
import NotFound from '../pages/NotFound/NotFound.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/register/parent" element={<ParentRegisterPage />} />
      <Route path="/register/child" element={<ChildRegisterPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
