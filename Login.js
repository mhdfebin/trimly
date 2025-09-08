import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const roleDoc = await getDoc(doc(db, 'users', uid));
      const role = roleDoc.exists() ? roleDoc.data().role : 'user';

      if (role === 'user') navigate('/user');
      else if (role === 'salon') navigate('/salon');
      else if (role === 'admin') navigate('/admin');
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" required />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
