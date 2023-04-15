import { useState } from 'react'
import { auth } from './utils';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { SignIn, SignUp, UserDashboard } from './pages';



function App() {

  const [authenticated] = useState(auth.isAuth());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={authenticated ? <Navigate to="/userDashboard" /> : <SignIn />} />
        <Route path="userDashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;