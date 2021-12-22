import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Register from './component/Register';
import SupplyerForm from './component/supplyer/SupplyerForm'
import CustomerReq from './component/Customer/CustomerReq';
import TestContextState from './context/TestContextState';
import Admin from './component/Admin/Admin'

function App() {
  return (
    <TestContextState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/supplyer" element={<SupplyerForm />} />
          <Route path="/Customer" element={<CustomerReq />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </TestContextState>
  );
}
export default App;
