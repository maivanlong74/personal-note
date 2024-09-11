import { Button } from '@material-tailwind/react';
import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from '@config/firebase';
import { useNavigate } from 'react-router-dom';
import iconGoogle from '@assets/images/google.png';

const getUserAgent = () => {
  if (
    (navigator.userAgent.indexOf('Opera') ||
      navigator.userAgent.indexOf('OPR')) != -1
  ) {
    return 'Opera';
  } else if (navigator.userAgent.indexOf('Edg') != -1) {
    return 'Edge';
  } else if (navigator.userAgent.indexOf('Chrome') != -1) {
    return 'Chrome';
  } else if (navigator.userAgent.indexOf('Safari') != -1) {
    return 'Safari';
  } else if (navigator.userAgent.indexOf('Firefox') != -1) {
    return 'Firefox';
  } else if (
    navigator.userAgent.indexOf('MSIE') != -1 ||
    !!document.documentMode == true
  ) {
    //IF IE > 10
    return 'IE';
  } else {
    return undefined;
  }
};

export const LoginButton = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    if (getUserAgent() === undefined) {
      signInWithGoogleRedirect().then((result) => {
        navigate('/');
      });
    } else {
      signInWithGooglePopup().then((result) => {
        navigate('/');
      });
    }
  };

  return (
    <div className="flex justify-center mx-auto">
      <Button size="lg" variant="outlined" color="white" className="flex items-center gap-3" onClick={handleLogin}>
        <img src={iconGoogle} alt="metamask" className="h-6 w-6" />
        Sign in with Google
      </Button>
    </div>
  );
};
