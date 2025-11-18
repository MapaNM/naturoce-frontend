import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import AdminPage from './pages/adminPage';
import TestPage from './pages/testPage';
import { Toaster } from 'react-hot-toast';
import ClientPage from './pages/client/clientPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPasswordPage from './pages/client/forgetPassword';

const clientId = "18aea6a72da622aadc45f4a201072fe72546fa4c"

function App() {

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId}>
        <div className='w-full h-screen flex justify-center items-center'>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/*" element={<ClientPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/forget" element={<ForgetPasswordPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
