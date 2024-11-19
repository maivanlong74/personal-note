
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { HeaderSection } from '@layouts/HeaderSection'
import { PersonalNoteProvider } from '@contexts/PersonalNoteContext';
import { useUserContext } from '../contexts/UserContext';
import ToolSideBar from '@components/SideBar/ToolSideBar';
import { BiSolidChevronRightCircle, BiSolidChevronLeftCircle } from "react-icons/bi";

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

  const changeShowMenu = () => {
    setIsShow(!isShow)
  }

  return (
    <div className='h-screen text-sm'>
      <PersonalNoteProvider>
        <div className='h-screen w-full flex items-center'>
          <div className={`w-auto h-[60%] min-h-[60%] flex items-center absolute ${isShow ? '' : 'z-0'}`}>
            <ToolSideBar showSideBar={isShow} />
          </div>
          <div onClick={changeShowMenu} className={`absolute ${isShow ? 'right-0' : ''} h-[10%] min-h-[10%] flex items-center z-20 bg-[#A04747]`}>
            {isShow ? (
              <BiSolidChevronLeftCircle className='h-[30px] w-[30px]' />
            ) : (
              <BiSolidChevronRightCircle className='h-[30px] w-[30px]' />
            )}
          </div>
          <div className='w-full h-full flex flex-col'>
            {/* <HeaderSection /> */}
            <div className={`flex-grow overflow-y-auto p-5 ${isShow ? '' : 'z-10'}`}>
              <Outlet />
            </div>
          </div>
        </div>
      </PersonalNoteProvider>
    </div>
  )
}

