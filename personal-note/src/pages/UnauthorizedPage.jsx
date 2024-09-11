import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from '@contexts/UserContext';
import { LogoutButton } from '../components/Button/LogoutButton';


export default function UnauthorizedPage() {
  const {userProfile, isAuthorized} = useUserContext();

  const navigate = useNavigate();
  useEffect(() => {
    const ensureAuthorized = () => {
      if (isAuthorized && userProfile?.isActive) {
        navigate('/');
      }
    };

    ensureAuthorized();
  }, [userProfile, isAuthorized, navigate]);

  return (
    <main id="main" className="relative flex min-h-screen flex-col justify-center overflow-hidden py-6 sm:py-12 bg-black">
      <section id="loadingSection" className="mx-auto max-w-md">
        <div className="my-5 text-red-500">
          You are not authorized or account is inactive.
        </div>
        <div className="px-4 text-center">
          <LogoutButton />
        </div>
      </section>
    </main>
  );
}
