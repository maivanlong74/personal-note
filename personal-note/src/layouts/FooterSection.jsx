import { useEffect, useState } from "react";
// import { Button } from '@material-tailwind/react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@contexts/UserContext';
import { version } from '../../package.json';


export const FooterSection = () => {
  const { userProfile, logout } = useUserContext();

  const [email, setEmail] = useState(userProfile?.email)
  const [roles, setRoles] = useState(userProfile?.roles)

  const navigate = useNavigate();
  useEffect(() => {
    const ensureAuthorized = () => {
      if (!userProfile) {
        return;
      }

      if (!userProfile.roles) {
        navigate('/error')
        return;
      }

      setEmail(userProfile.email);
      setRoles(userProfile.roles);
    };

    ensureAuthorized();
  }, [userProfile]);

  const onLockOut = () => {
    const auth = getAuth();

    signOut(auth).then(() => {
      // Sign-out successful.
      logout()
      navigate('/')
    }).catch((error) => {
      // An error happened.
      console.log('error', error);
    });
  }

  return (
    <div className='fixed bottom-0 w-full text-center mx-auto h-12 bg-main bg-opacity-80 z-50'>
      <span className='inline-block text-white text-center pt-[10px] mr-2'>{email} {roles ? `(${roles[0]})` : ''} </span>
      <span className='inline-block text-white text-center pt-[10px] mx-2'>|</span>
      {/* <Button variant='text' color='white' onClick={onLockOut} className='px-2'>
        <div className='flex flex-row items-center justify-center'>
          <svg className="w-4 h-4 text-whit" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
            <path stroke="currentColor" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
          </svg>
          <div className='ml-3'></div>
          logout
        </div>
      </Button> */}
      <button onClick={onLockOut} className='text-white px-2'>
        <div className='flex flex-row items-center justify-center'>
          <svg className="w-4 h-4 text-whit" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
            <path stroke="currentColor" strokeLinecap='round' strokeLinejoin='round' strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
          </svg>
          <div className='ml-3'></div>
          logout
        </div>
      </button>
      <span className='inline-block text-white text-center pt-[10px] mx-2'>|</span>
      <span className='inline-block text-white text-center pt-[10px] mx-2'>v{version}</span>
    </div>
  );
}
