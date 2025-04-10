import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

import '@assets/css/sideBar.scss';
import { useUserContext } from '@contexts/UserContext';
import logo from '@assets/images/logo.svg';
import user from '@assets/images/user@2x.png';
import { version } from '../../../package.json';
import { BiSolidChevronRightCircle, BiSolidChevronLeftCircle } from "react-icons/bi";

const ToolSideBar = () => {
  const { userProfile, logout, checkPage, isShow, setIsShow } = useUserContext();
  const [name, setName] = useState(userProfile?.displayName);
  const [roles, setRoles] = useState(userProfile?.roles);
  const [photoURL, setPhotoURL] = useState(userProfile?.photoURL);
  const location = useLocation();
  const navigate = useNavigate();

  const { VITE_PORTAL_URL: portalUrl } = import.meta.env;

  useEffect(() => {
    const ensureAuthorized = () => {
      if (!userProfile) {
        return;
      }
      if (!userProfile.roles) {
        navigate('/error');
        return;
      }

      setName(userProfile.displayName);
      setPhotoURL(userProfile.photoURL);
      setRoles(userProfile.roles);
    };
    ensureAuthorized();
  }, [userProfile]);

  const onLockOut = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        logout();
        navigate('/');
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const changeShowMenu = () => {
    setIsShow(!isShow);
  }

  const tabMenuHtml = (roleType, link, content) => {
    const isActive = location.pathname === link;
  
    return (
      <div style={roleType === roles ? {} : { display: 'none' }}
        className={`w-full flex justify-center self-stretch relative ${
          !isActive
            ? 'hover:bg-[#a4b0be] hover:border hover:border-indigo-200 hover:border-y-indigo-500'
            : ''
        } ${checkPage}`}
      >
        <Link
          to={link}
          className={`w-full text-left py-1 text-sm no-underline ${
            isActive
              ? 'text-[#ff4757]'
              : 'text-black hover:bg-[#a4b0be] hover:border hover:border-y-indigo-500'
          }`}
        >
          {content}
        </Link>
      </div>
    );
  };
  return (
    <>
      <div className={`flex flex-col items-center w-full h-full text-black text-left text-xl rounded-[40px] border-0 box-border p-4
        transition duration-300 overflow-auto scroll-bar-none
        ${isShow ? 'translate-x-0' : '-translate-x-full'}`}>
        <Link
          to={portalUrl}
          className="w-full flex flex-col items-center justify-start pb-2 box-border relative gap-2 text-center text-black no-underline"
        >
          <img className="w-[77.3px] relative h-[50px] z-[0]" alt="" src={logo} />
          <div className="text-lg font-bigger">Jade Dragon</div>
        </Link>
        {/* MAIN */}
        <div className="w-full flex flex-col items-center justify-start py-0 box-border">
          <div className="w-full flex justify-center self-stretch relative tracking-[0.04em] uppercase font-bold">
            <div className={`w-full text-left font-bigger overflow-hidden whitespace-nowrap truncate`} title={`${name}`}>
              {checkPage ? 'Trang Admin' : `Wellcome ${name}`}
            </div>
          </div>
          <div className="w-full flex flex-col items-center box-border gap-1 pb-2">
            {/* admin */}
            {tabMenuHtml('admin', '/management-user-page', 'Danh sách người dùng')}
            {tabMenuHtml('admin', '/report-site', 'Danh sách ghi chú')}
            {tabMenuHtml('admin', '/tool-inventory-summary', 'Danh sách phê duyệt')}
            {tabMenuHtml('admin', '/consumables', '消耗品管理')}

            {/* client */}
            {tabMenuHtml('client', '/home', 'Trang chủ')}
            {tabMenuHtml('client', '/my-note', 'Ghi chú')}
          </div>
          <div className="w-full rounded bg-gray-500 h-[0.1rem]" />
        </div>
        {/* TOOL */}
        {/* <div className="w-full flex flex-col items-center py-0 box-border">
        <div className="w-full flex justify-center self-stretch relative tracking-[0.04em] pt-2 uppercase font-bold">
          <div className="w-full text-left font-bigger">TOOL</div>
        </div>
        
        <div className="w-full rounded bg-gray-500 h-[0.1rem]" />
      </div> */}
        {/* ACCOUNT */}
        <div className="w-full flex flex-col items-center justify-start py-0 box-border">
          <div className="w-full flex justify-center self-stretch relative tracking-[0.04em] pt-2 uppercase font-bold">
            <div className="w-full text-left font-bigger">ACCOUNT</div>
          </div>
          <div className="w-full flex flex-col items-center justify-start pb-2 box-border gap-1 text-sm ">
            <div className="w-full py-1 h-full hover:bg-[#a4b0be] text-black hover:border hover:border-indigo-200 hover:border-y-indigo-500 flex justify-center self-stretch relative">
              <Link
                to=""
                className="w-full text-left text-sm no-underline"
                onClick={onLockOut}
              >
                Đăng xuất
              </Link>
            </div>
            {/* <div className="w-full py-1 h-full hover:bg-[#dfe6e9] hover:text-gray-900 flex justify-center self-stretch relative">
            <Link to="" className="w-full text-left text-sm text-black no-underline">
              設定
            </Link>
          </div> */}
          </div>
          <div className="w-full rounded bg-gray-500 h-[0.1rem]" />
        </div>
        <div className='h-full'></div>
        <div className="w-full flex flex-col items-center justify-start py-0 box-border">
          <div className="w-full flex flex-col items-center justify-start mt-2 ipad:mb-24">
            <img
              className="w-10 relative h-10 object-cover rounded-full"
              alt="user-profile"
              src={photoURL || user}
            />
            <div className="self-stretch relative text-sm text-center">
              {name}
            </div>
            <div className="self-stretch relative text-gray-400 text-xs text-center">
              v{version}
            </div>
          </div>
        </div>
      </div>
      <div onClick={changeShowMenu} className={`absolute right-[-20px] h-[10%] min-h-[10%] flex items-center z-20`}>
        {isShow ? (
          <BiSolidChevronLeftCircle id='button1' className='h-[30px] w-[30px]' />
        ) : (
          <BiSolidChevronRightCircle id='button2' className='h-[30px] w-[30px]' />
        )}
      </div>
    </>
  );
};

export default ToolSideBar;
