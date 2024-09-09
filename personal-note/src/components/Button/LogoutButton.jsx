import { Button } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@contexts/UserContext';
import { getAuth, signOut } from "firebase/auth";

export const LogoutButton = () => {
  const {logout} = useUserContext();

  const navigate = useNavigate()
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
    <div>
      <Button variant='outlined' color='white' onClick={onLockOut}>
        <div className='flex flex-row items-center justify-center'>
          <svg className="w-6 h-6 text-whit" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
          </svg>
          <div className='ml-3'></div>
          logout
        </div>
      </Button>
    </div>
  );
}
