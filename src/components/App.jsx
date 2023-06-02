import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import ChoosedMonth from './Calendar/ChoosedMonth/ChoosedMonth';
import ChoosedDay from './Calendar/ChoosedDay/ChoosedDay';

const StartPage = lazy(() => import('pages/Start/StartPage'));
const LoginPage = lazy(() => import('pages/Login/LoginPage'));
const RegisterPage = lazy(() => import('pages/Register/RegisterPage'));
const AccountPage = lazy(() => import('pages/Account/AccountPage'));
const CalendarPage = lazy(() => import('pages/Calendar/CalendarPage'));
const MainLayout = lazy(() => import('pages/MainLayout/MainLayout'));

export const App = () => {
  return (
    <Routes>
      <Route>
        <Route path="" element={<StartPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        <Route path="main" element={<MainLayout />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="month/:currentDate" element={<ChoosedMonth />} />
        <Route path="day/:currentDay" element={<ChoosedDay />} />
        <Route path="account" element={<AccountPage />} />
      </Route>
    </Routes>
  );
};
