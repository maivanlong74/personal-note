
import { useEffect } from "react";
import { auth } from "@config/firebase";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@contexts/AppContext";
import { useUserContext } from '@contexts/UserContext';

import { UserService } from "@services/UserService";

import logo from "@assets/images/logo.svg";

export default function SplashPage() {
  const { setErrorMessage } = useAppContext();
  const {isAuthorized, canManage, setCheckPage} = useUserContext();

  const navigate = useNavigate();

  const checkAuthen = () => {
    setErrorMessage(null);
    auth.onAuthStateChanged((user) => {
      if(user) {
        UserService.canConnect()
        .then(()=> {
          if (isAuthorized) {
            setCheckPage(canManage);
            if (canManage) {
              navigate('/management-user-page');
            } else {
              navigate('/home');
            }
          } else {
            navigate('/login');
          }
        })
        .catch((error) => {
          setErrorMessage(error.message);
          navigate('/error')
        });
      }else{
        navigate('/login');
      }
    });
  }

  useEffect(() => {
    setTimeout(() => {
      checkAuthen();
    }, 1000);
  }, []);

  return (
    <main id="main" className="relative flex min-h-screen flex-col justify-center overflow-hidden py-6 sm:py-12 bg-black">
      <section id="loadingSection" className="mx-auto max-w-md">
        <div className="my-5 relative">
          <img className="absolute z-50 h-20 w-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src={logo} />
          <span className="relative flex h-12 w-12 left-1/2 transform -translate-x-1/2 ">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-navy-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-12 w-12 bg-navy-900 opacity-50"></span>
          </span>
        </div>
        <span className="my-4 text-white ">Đang truy cập...</span>
      </section>

    </main>
  );
}
