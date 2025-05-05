
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { PersonalNoteProvider } from '@contexts/PersonalNoteContext';
import { useUserContext } from '../contexts/UserContext';
import ToolSideBar from '@components/SideBar/ToolSideBar';
import { useEffect } from 'react';

export const MainPageLayoutAdmin = () => {
  const {
    canManage, isAuthorized,
    isShow, setIsPageAdmin
  } = useUserContext();
  const location = useLocation();

  useEffect(() => {
    setIsPageAdmin(true);
  }, );

  if (!isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  else if (isAuthorized && !canManage) {
    return <Navigate to="/home" />;
  }

  return (
    <div className='h-screen text-sm'>
      <PersonalNoteProvider>
        <div className='h-screen w-full flex items-center'>
          <div className={`${isShow ? 'w-[280px] min-w-[280px]' : 'w-[10px]'} h-full flex items-center relative`}>
            <ToolSideBar/>
          </div>
          <div className='w-full h-full flex flex-col'>
            <div className={`flex-grow overflow-y-auto p-5`}>
              <Outlet />
            </div>
          </div>
        </div>
      </PersonalNoteProvider>
    </div>
  )
}

