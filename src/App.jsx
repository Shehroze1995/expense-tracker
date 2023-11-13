import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ExpenseTracker from "./pages/ExpenseTracker";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
};

export default App;
