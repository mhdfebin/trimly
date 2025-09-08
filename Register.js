import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      await setDoc(doc(db, 'users', uid), { role });
      if (role === 'user') navigate('/user');
      else if (role === 'salon') navigate('/salon');
      else if (role === 'admin') navigate('/admin');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" required />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border p-2 rounded">
          <option value="user">User</option>
          <option value="salon">Salon Owner</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
}
