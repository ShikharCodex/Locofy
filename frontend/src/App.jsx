import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Finder from './pages/Finder';
import ReportForm from './pages/ReportForm';
import Dashboard from './pages/Dashboard';
import PersonDetail from './pages/PersonDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/finder" element={
                <ProtectedRoute>
                  <Finder />
                </ProtectedRoute>
              } />
              
              <Route path="/report" element={
                <ProtectedRoute>
                  <ReportForm />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/person/:id" element={
                <ProtectedRoute>
                  <PersonDetail />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} LostFinder App. All rights reserved.
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
