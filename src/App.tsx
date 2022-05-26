import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from 'views/Dashboard/Dashboard';
import SignIn from 'views/SignIn';
import Calendar from 'views/Calendar'

function App() {
  return (
    <Routes>
      <Route path='/SignIn' element={<SignIn />} />
      <Route path='/' element={<Navigate to='/Calendar' />} />
      <Route path='/' element={<Dashboard />}>
        <Route path='/Calendar' element={<Calendar />} />
      </Route >
    </Routes>
  );
}

export default App;
