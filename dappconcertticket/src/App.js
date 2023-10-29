import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import background from "./images/bg1.jpg";
import AddTicket from './components/AddTicket';
function App() {
  return (
    <div style={{ backgroundImage: `url(${background})`,height: "100vh",width:"100vw",backgroundRepeat: "no-repeat",backgroundSize:"cover"}}>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/add-ticket/:data" element={<AddTicket/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;