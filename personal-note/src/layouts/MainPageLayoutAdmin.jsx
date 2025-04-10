
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { PersonalNoteProvider } from '@contexts/PersonalNoteContext';
import { useUserContext } from '../contexts/UserContext';
import ToolSideBar from '@components/SideBar/ToolSideBar';

export const MainPageLayoutAdmin = () => {
  const {
    canManage, isAuthorized,
    isShow, setIsShow,
  } = useUserContext();
  const location = useLocation();

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
          <div className={`w-auto h-[60%] min-h-[60%] flex items-center absolute`}>
            <ToolSideBar/>
          </div>
          <div className='w-full h-full flex flex-col'>
            <div className={`flex-grow overflow-y-auto p-5 ${isShow ? '' : 'z-10'}`}>
              <Outlet />
            </div>
          </div>
        </div>
      </PersonalNoteProvider>
    </div>
  )
}

