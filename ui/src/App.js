import { useState } from 'react'
import { auth } from './utils';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { SignUp, UserDashboard, SignOut, AdminDashboard, UserData, TransactionData, UserEdit, TransactionEdit, LandingPage } from './pages';
import Unauthorized from './components/Unauthorized'


function App() {

  const [authenticated] = useState(auth.isAuth());
  const [authorized] = useState(auth.isAuthorized())

  const SignInRoute = () => {
    if (authenticated && authorized) {
      return (<Route path="/" element={<Navigate to="/admin" />} />)
    } else if (authenticated) {
      return (<Route path="/" element={<Navigate to="/userDashboard" /> } />)
    } else {
      return (<Route path="/" element={<LandingPage />} />)
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="sign-up" element={<SignUp />} />
        {SignInRoute()}
        <Route path="userDashboard" element={authenticated ? <UserDashboard /> : <Navigate to = "/access-denied" />} />
        <Route path="sign-out" element={<SignOut />} />
        <Route path="admin" element={authenticated && authorized ? <AdminDashboard /> : <Navigate to = "/access-denied" />} />
        <Route path="admin/users/:id" element={authenticated && authorized ? <UserData /> : <Navigate to = "/access-denied" /> } />
        <Route path="admin/users/:id/edit" element={authenticated && authorized ? <UserEdit /> : <Navigate to = "/access-denied" />} />
        <Route path="admin/transactions/:id/edit" element={authenticated && authorized ? <TransactionEdit /> : <Navigate to = "/access-denied" />} />
        <Route path="admin/transactions/:id" element={authenticated && authorized ? <TransactionData /> : <Navigate to = "/access-denied" />} />
        <Route path="access-denied" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;