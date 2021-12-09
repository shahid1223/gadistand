import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './component/Login';
import Register from './component/Register';
import New from './component/New';
import SupplyerForm from './component/supplyer/SupplyerForm'
import CustomerReq from './component/Customer/CustomerReq';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/supplyer" element={<SupplyerForm />} />
    <Route path="/Customer" element={<CustomerReq />} />
    </Routes>
    </BrowserRouter>
  //  <Register/>
  // <SupplyerForm/>
  // <Login/>
  // <CustomerReq/>
  );
}
export default App;
