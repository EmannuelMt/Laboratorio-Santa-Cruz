import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import DateVerification from './components/DateVerification';
import ExamResult from './components/ExamResult';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify" element={<ProtectedRoute><DateVerification /></ProtectedRoute>} />
        <Route path="/result" element={<ProtectedRoute><ExamResult /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;