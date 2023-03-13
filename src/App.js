import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PNF';
import Main from './components/nav/Main';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/auth';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Main/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='*' element={<PageNotFound />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
