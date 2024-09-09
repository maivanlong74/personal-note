import { Suspense, lazy } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContextProvider } from '@contexts/UserContext';

import { MainPageLoyout } from '@layouts/MainPageLayout';
import { FullPageLayout } from '@layouts/FullPageLayout';

const HomePage = lazy(() => import('./pages/adminPage/HomePage'));
const SplashPage = lazy(() => import('@pages/SplashPage'));
const LoginPage = lazy(() => import('@pages/LoginPage'));
const UnauthorizedPage = lazy(() => import('@pages/UnauthorizedPage'));
const ErrorPage = lazy(() => import('@pages/ErrorPage'));

export const Routers = () => {
  return (
    <Router basename={'/'}>
      <Suspense fallback=''>
        <UserContextProvider>
          <Routes>
            <Route element={<FullPageLayout />}>
              <Route exact path={'/'} element={<SplashPage />} />
            </Route>
            <Route element={<MainPageLoyout />}>
              <Route path={'/home'} element={<HomePage />} />
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
