import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { HeaderSection } from '@layouts/HeaderSection'
import { FooterSection } from '@layouts/FooterSection'
import { PersonalNoteProvider } from '@contexts/PersonalNoteContext';
import { useUserContext } from '../contexts/UserContext';

export const MainPageLayoutClient = () => {
  const { userProfile } = useUserContext();
  const location = useLocation();

  if (!userProfile) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <div className='flex flex-col h-screen justify-between mb-24'>
      <PersonalNoteProvider>
        <HeaderSection />
        <Outlet />
        <FooterSection />
      </PersonalNoteProvider>
    </div>
  );
};

