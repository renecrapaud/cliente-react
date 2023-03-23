import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PNF';
import Main from './components/nav/Main';
import ForgotPassword from './pages/ForgotPassword';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast"
import { AuthProvider } from './context/auth';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Main/>
        <Toaster/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/forgot-password' element={<ForgotPassword />}/>
          <Route path='/dashboard' element={<PrivateRoute />}>
            <Route path='' element={<Dashboard />}/>
          </Route>
          <Route path='*' element={<PageNotFound />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
