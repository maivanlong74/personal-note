import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { HeaderSection } from '@layouts/HeaderSection'
import { PersonalNoteProvider } from '@contexts/PersonalNoteContext';
import { useUserContext } from '../contexts/UserContext';
import ToolSideBar from '@components/SideBar/ToolSideBar';

export const MainPageLayoutClient = () => {
  const { userProfile } = useUserContext();
  const location = useLocation();

  if (!userProfile) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <div className='h-screen bg-gray-700 text-sm'>
      <PersonalNoteProvider>
        <div className='h-screen w-full flex'>
          <div className='w-auto h-full'>
            <ToolSideBar showSideBar={true} typePages="desktop" />
          </div>
          <div className='w-full h-full flex flex-col'>
            <HeaderSection />
            <div className="flex-grow overflow-y-auto p-5">
              <Outlet />
            </div>
          </div>
        </div>
      </PersonalNoteProvider>
    </div>
  );
};

