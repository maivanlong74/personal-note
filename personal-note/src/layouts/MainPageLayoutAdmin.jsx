
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { HeaderSection } from '@layouts/HeaderSection'
import { FooterSection } from '@layouts/FooterSection'
import { PersonalNoteProvider } from '@contexts/PersonalNoteContext';
import { useUserContext } from '../contexts/UserContext';

export const MainPageLayoutAdmin = () => {
  const { canManage, isAuthorized } = useUserContext();
  const location = useLocation();

  if (!isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  else if (isAuthorized && !canManage) {
    return <Navigate to="/home" />;
  }

  return (
    <div className='flex flex-col h-screen justify-between mb-24'>
      <PersonalNoteProvider>
        <HeaderSection />
        <Outlet />
        <FooterSection />
      </PersonalNoteProvider>
    </div>
  )
}

