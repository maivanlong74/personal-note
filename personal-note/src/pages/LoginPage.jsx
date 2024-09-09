import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from '@contexts/UserContext';
import logo from "@assets/images/logo.svg";
import { LoginButton } from '@components/Button/LoginButton';


export default function LoginPage() {
  const { userProfile } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    const ensureAuthorized = () => {
      if (userProfile) {
        navigate('/home');
      }
    };

    ensureAuthorized();
  }, [userProfile]);

  return (
    <main id="main" className="relative flex min-h-screen flex-col justify-center overflow-hidden py-6 sm:py-12 bg-black">
      <section id="loadingSection" className="mx-auto max-w-md">
        <div className="my-5">
          <img className="mx-auto h-20 w-20" src={logo} />
        </div>
        <div className="px-4">
          <LoginButton />
        </div>
      </section>
    </main>
  );
}
