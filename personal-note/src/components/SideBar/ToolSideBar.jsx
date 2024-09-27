import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

import '@assets/css/sideBar.scss';
import { useUserContext } from '@contexts/UserContext';
import logo from '@assets/images/logo.svg';
import user from '@assets/images/user@2x.png';
import { version } from '../../../package.json';

const ToolSideBar = ({ showSideBar }) => {
  const { userProfile, logout } = useUserContext();
  const [name, setName] = useState(userProfile?.displayName);
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

  return (
    <div className={`flex flex-col items-center w-[280px] min-w-[280px] h-full bg-[#7e6f2c] text-white text-left text-2xl rounded-[40px] border-0 box-border p-4
        transition duration-300 overflow-auto scroll-bar-none
        ${showSideBar ? 'translate-x-0' : '-translate-x-full'}`}>
      <Link
        to={portalUrl}
        className="w-full flex flex-col items-center justify-start pb-2 box-border relative gap-2 text-center text-white no-underline"
      >
        <img className="w-[77.3px] relative h-[50px] z-[0]" alt="" src={logo} />
        <div className="text-lg font-bigger">アイエヌジー株式会社</div>
        <div className="w-full text-base text-gray-100 text-icons-description-text flex items-center justify-center font-bronco">
          ING CO., LTD.
        </div>
      </Link>
      {/* MAIN */}
      <div className="w-full flex flex-col items-center justify-start py-0 box-border">
        <div className="w-full flex justify-center self-stretch relative tracking-[0.04em] uppercase font-bold">
          <div className="w-full text-left font-bigger">MAIN</div>
        </div>
        <div className="w-full flex flex-col items-center box-border gap-1 pb-2">
          <div
            className={`w-full flex justify-center self-stretch relative ${location.pathname !== '/management'
              ? 'hover:bg-orange hover:text-gray-900'
              : ''
              }`}
          >
            <Link
              to="/management"
              className={`w-full text-left py-1 text-sm no-underline
                  ${location.pathname === '/management'
                  ? 'text-orange'
                  : 'text-white hover:bg-orange hover:text-gray-900'
                }
                `}
            >
              道具概要
            </Link>
          </div>
          <div
            className={`w-full flex justify-center self-stretch relative ${location.pathname !== '/report-site'
              ? 'hover:bg-orange hover:text-gray-900'
              : ''
              }`}
          >
            <Link
              to="/report-site"
              className={`w-full text-left py-1 text-sm no-underline
                  ${location.pathname === '/report-site'
                  ? 'text-orange'
                  : 'text-white hover:bg-orange hover:text-gray-900'
                }
                `}
            >
              現場報告
            </Link>
          </div>
          <div
            className={`w-full flex justify-center self-stretch relative ${location.pathname !== '/tool-inventory-summary'
              ? 'hover:bg-orange hover:text-gray-900'
              : ''
              }`}
          >
            <Link
              to="/tool-inventory-summary"
              className={`w-full text-left py-1 text-sm no-underline
                  ${location.pathname === '/tool-inventory-summary'
                  ? 'text-orange'
                  : 'text-white hover:bg-orange hover:text-gray-900'
                }
                `}
            >
              道具のまとめ
            </Link>
          </div>
          <div
            className={`w-full flex justify-center self-stretch relative ${location.pathname !== '/consumables'
              ? 'hover:bg-orange hover:text-gray-900'
              : ''
              }`}
          >
            <Link
              to="/consumables"
              className={`w-full text-left py-1 text-sm no-underline
                  ${location.pathname === '/consumables'
                  ? 'text-orange'
                  : 'text-white hover:bg-orange hover:text-gray-900'
                }
                `}
            >
              消耗品管理
            </Link>
          </div>
        </div>
        <div className="w-full rounded bg-gray-500 h-[0.1rem]" />
      </div>
      {/* TOOL */}
      <div className="w-full flex flex-col items-center py-0 box-border">
        <div className="w-full flex justify-center self-stretch relative tracking-[0.04em] pt-2 uppercase font-bold">
          <div className="w-full text-left font-bigger">TOOL</div>
        </div>
        
        <div className="w-full rounded bg-gray-500 h-[0.1rem]" />
      </div>
      {/* ACCOUNT */}
      <div className="w-full flex flex-col items-center justify-start py-0 box-border">
        <div className="w-full flex justify-center self-stretch relative tracking-[0.04em] pt-2 uppercase font-bold">
          <div className="w-full text-left font-bigger">ACCOUNT</div>
        </div>
        <div className="w-full flex flex-col items-center justify-start pb-2 box-border gap-1 text-sm ">
          <div className="w-full py-1 h-full hover:bg-orange hover:text-gray-900 flex justify-center self-stretch relative">
            <Link
              to=""
              className="w-full text-left text-sm text-white no-underline"
              onClick={onLockOut}
            >
              ログアウト
            </Link>
          </div>
          <div className="w-full py-1 h-full hover:bg-orange hover:text-gray-900 flex justify-center self-stretch relative">
            <Link to="" className="w-full text-left text-sm text-white no-underline">
              設定
            </Link>
          </div>
        </div>
        <div className="w-full rounded bg-gray-500 h-[0.1rem]" />
      </div>
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
  );
};

export default ToolSideBar;
