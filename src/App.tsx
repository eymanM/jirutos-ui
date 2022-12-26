import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from 'views/Dashboard/Dashboard';
import CalendarView from 'views/CalendarView';
import FilterView from 'views/Dashboard/Filters';
import { APP_NAME } from 'state/constans/constans';
import ReportView from 'views/ReportView';
import StopwatchView from 'views/StopwatchView';
import Sign from 'views/Sign';
import SettingsView from 'views/SettingsView';

function App() {
  document.title = APP_NAME;
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Calendar" />} />
      <Route path="/" element={<Dashboard />}>
        <Route path="/Calendar" element={<CalendarView />} />
        <Route path="/Filter" element={<FilterView />} />
        <Route path="/Report" element={<ReportView />} />
        <Route path="/Stopwatch" element={<StopwatchView />} />
      </Route>
      <Route path="/Sign/:signOption" element={<Sign />} />
      <Route path="/Settings" element={<SettingsView />} />
    </Routes>
  );
}

export default App;
