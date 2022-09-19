import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './pages';
import Nav from './pages/Nav';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CreateNote from './pages/createNote';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route exact path='/dashboard' element={<Dashboard />} />
            <Route path='/create' element={<CreateNote />} />
          </Route>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
