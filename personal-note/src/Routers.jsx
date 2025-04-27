import { Suspense, lazy } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContextProvider } from '@contexts/UserContext';

import { MainPageLayoutAdmin } from '@layouts/MainPageLayoutAdmin';
import { MainPageLayoutClient } from '@layouts/MainPageLayoutClient';
import { FullPageLayout } from '@layouts/FullPageLayout';

const SplashPage = lazy(() => import('@pages/SplashPage'));
const LoginPage = lazy(() => import('@pages/LoginPage'));
const UnauthorizedPage = lazy(() => import('@pages/UnauthorizedPage'));
const ErrorPage = lazy(() => import('@pages/ErrorPage'));

//Admin
import ManagementUserPage from '@pages/adminPage/ManagementUserPage';

//Client
import HomePage from '@pages/clientPage/HomePage';
import NotePage from './pages/clientPage/NotePage';

export const Routers = () => {
  return (
    <Router basename={'/'}>
      <Suspense fallback=''>
        <UserContextProvider>
          <Routes>
            <Route element={<FullPageLayout />}>
              <Route exact path={'/'} element={<SplashPage />} />
            </Route>

            <Route element={<MainPageLayoutAdmin />}>
              <Route path={'/management-user-page'} element={<ManagementUserPage />} />
            </Route>

            <Route element={<MainPageLayoutClient />}>
              <Route path={'/home'} element={<HomePage />} />
              <Route path={'/my-note'} element={<NotePage />} />
            </Route>

            <Route path={'/error'} element={<ErrorPage />} />
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/unauthorized'} element={<UnauthorizedPage />} />
            <Route path={'*'} element={<SplashPage />} />
          </Routes>
        </UserContextProvider>
      </Suspense>
    </Router>
  );
};
