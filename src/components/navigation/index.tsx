import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import Home from '../../pages/home';
import Chart from '../../pages/chart';

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/charts" element={<Chart />} />
        <Route
          path="*"
          element={<Navigate to="" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
