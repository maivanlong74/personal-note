import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

import '@assets/css/sideBar.scss';
import { useUserContext } from '@contexts/UserContext';
import { ModalConfirm } from '../Modal/modal-confirm';
import logo from '@assets/images/logo.svg';
import user from '@assets/images/user@2x.png';
import { version } from '../../../package.json';
import { BiSolidChevronRightCircle, BiSolidChevronLeftCircle } from "react-icons/bi";

const ToolSideBar = () => {
  // Khai báo biến chứa dữ liệu
  const { userProfile, logout, checkPageAdmin, isShow, setIsShow } = useUserContext();
  const [name, setName] = useState(userProfile?.displayName);
  const [roles, setRoles] = useState(userProfile?.roles);
  const [photoURL, setPhotoURL] = useState(userProfile?.photoURL);
  const location = useLocation();
  const navigate = useNavigate();
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    title: "",
  });

  // Kiểm tra quyền và xác nhận thông tin user
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

  // tắt bật menu
  const changeShowMenu = () => {
    setIsShow(!isShow);
  }

  // Tạo tab menu
  const tabMenuHtml = (pageAdmin, link, content) => {
    const isActive = location.pathname === link;

    return (
      <div style={checkPageAdmin != pageAdmin ? { display: 'none' } : {}}
        className={`w-full flex justify-center self-stretch relative ${!isActive
            ? 'hover:bg-[#a4b0be] hover:border hover:border-indigo-200 hover:border-y-indigo-500'
            : ''
          } ${checkPageAdmin}`}
      >
        <Link
          to={link}
          className={`w-full text-left py-1 text-sm no-underline ${isActive
              ? 'text-[#ff4757]'
              : 'text-black hover:bg-[#a4b0be] hover:border hover:border-y-indigo-500'
            }`}
        >
          {content}
        </Link>
      </div>
    );
  };

  // tắt bật modal
  const handleShowModal = (message, isLoading, title) => {
    setDialog({ message, isLoading, title });
  }

  // logout
  const confirmLogout = (choose) => {
    if (choose) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          logout();
          navigate('/');
        })
        .catch((error) => {
          console.log('error', error);
        });

      // tắt modal
      handleShowModal("", false);
    } else {
      // tắt modal
      handleShowModal("", false);
    }
  };
  return (
    <>
      <div className={`flex flex-col items-center w-full h-full text-black text-left text-xl rounded-[40px] border-0 box-border p-4
        transition duration-300 overflow-auto scroll-bar-none
        ${isShow ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="w-full flex flex-col items-center justify-start pb-2 box-border relative gap-2 text-center text-black no-underline">
          <img className="w-[77.3px] relative h-[50px] z-[0]" alt="" src={logo} />
          <div className="text-lg font-bigger">Jade Dragon</div>
        </div>
        {/* MAIN */}
        <div className="w-full flex flex-col items-center justify-start py-0 box-border">
          <div className="w-full flex justify-center self-stretch relative tracking-[0.04em] uppercase font-bold">
            <div className={`w-full text-left font-bigger overflow-hidden whitespace-nowrap truncate`} title={`${name}`}>
              {checkPageAdmin ? 'Trang Admin' : `Wellcome ${name}`}
            </div>
          </div>
          <div className="w-full flex flex-col items-center box-border gap-1 pb-2">
            {/* admin */}
            {tabMenuHtml(true, '/management-user-page', 'Danh sách người dùng')}
            {tabMenuHtml(true, '/report-site', 'Danh sách ghi chú')}
            {tabMenuHtml(true, '/tool-inventory-summary', 'Danh sách phê duyệt')}
            {tabMenuHtml(true, '/consumables', '消耗品管理')}

            {/* client */}
            {tabMenuHtml(false, '/home', 'Trang chủ')}
            {tabMenuHtml(false, '/my-note', 'Ghi chú')}
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
              <button
                to=""
                className="w-full text-left text-sm no-underline"
                onClick={() => handleShowModal('Bạn có chắc chắn muốn đăng xuất?', true, 'Hộp thoại xác nhận')}
              >
                Đăng xuất
              </button>
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
      {dialog.isLoading && (
        <ModalConfirm
          title={dialog.title}
          message={dialog.message}
          onDialog={confirmLogout}
        />
      )}
    </>
  );
};

export default ToolSideBar;
