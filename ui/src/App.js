import { useState, useEffect } from 'react'
import { auth, network, logger } from './utils';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { SignIn, SignUp, UserDashboard, SignOut, AdminDashboard } from './pages';



function App() {

  const [authenticated] = useState(auth.isAuth());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={authenticated ? <Navigate to="/userDashboard" /> : <SignIn />} />
        <Route path="userDashboard" element={<UserDashboard />} />
        <Route path="sign-out" element={<SignOut />} />
        <Route path="admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;