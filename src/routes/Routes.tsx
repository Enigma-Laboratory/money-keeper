import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { HomeScreen } from 'pages/home';
import { AboutScreen } from 'pages/about';
import { ContactScreen } from 'pages/contact';
import { Landing } from 'pages/landing';
import { DetailedInvoice } from 'pages/home/analytic/DetailedInvoice';
import { OrderScreen } from 'pages/order';

export const BaseRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path="/detail" element={<DetailedInvoice />} />
        <Route path="/order" element={<OrderScreen />} />
      </Routes>
    </Router>
  );
};
