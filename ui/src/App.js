import { useState, useEffect } from 'react'
import { auth, network, logger } from './utils';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { SignIn, SignUp, UserDashboard, SignOut, AdminDashboard, UserData, TransactionData, UserEdit } from './pages';



function App() {

  const [authenticated] = useState(auth.isAuth());
  const [authorized] = useState(auth.isAuthorized())
  console.log("authorized: ", authorized)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={authenticated ? <Navigate to="/userDashboard" /> : <SignIn />} />
        <Route path="userDashboard" element={<UserDashboard />} />
        <Route path="sign-out" element={<SignOut />} />
        <Route path="admin" element={authenticated && authorized ? <AdminDashboard /> : <Navigate to = "/" />} />
        <Route path="admin/users/:id" element={authenticated && authorized ? <UserData /> : <Navigate to = "/" /> } />
        <Route path="admin/users/:id/edit" element={authenticated && authorized ? <UserEdit /> : <Navigate to = "/" />} />
        <Route path="admin/transactions/:id" element={authenticated && authorized ? <TransactionData /> : <Navigate to = "/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;