import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import Login from './Login';
import Register from './Register';

function Layout({ children }) {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">Trimly</h1>
        <nav className="space-x-4">
          <Link to="/">Home</Link>
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/register">Register</Link>}
          {user && <button onClick={logout} className="text-red-600">Logout</button>}
        </nav>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}

function HomePage() {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2">Welcome to Trimly ✂️</h2>
      <p className="text-gray-600">Your one-stop online salon booking platform.</p>
    </div>
  );
}

function UserPage() { return <h2>User Dashboard</h2>; }
function SalonPage() { return <h2>Salon Owner Dashboard</h2>; }
function AdminPage() { return <h2>Admin Dashboard</h2>; }

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<PrivateRoute><UserPage /></PrivateRoute>} />
          <Route path="/salon" element={<PrivateRoute><SalonPage /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
}
