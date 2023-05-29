import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomeScreen } from "pages/home";
import { AboutScreen } from "pages/about";
import { ContactScreen } from "pages/contact";

export const BaseRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
      </Routes>
    </Router>
  );
};
