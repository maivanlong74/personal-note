
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { HeaderSection } from '@layouts/HeaderSection'
import { PersonalNoteProvider } from '@contexts/PersonalNoteContext';
import { useUserContext } from '../contexts/UserContext';
import ToolSideBar from '@components/SideBar/ToolSideBar';

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
  )
}

