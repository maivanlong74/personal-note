import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@config/firebase";
import { getAuth, signOut } from "firebase/auth";
import { UserService } from "../services/UserService";
import { ROLE, ROLE_MANAGEMENT } from '../constants/ClientConstants';

const UserContext = createContext()
export const useUserContext = () => useContext(UserContext);

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({children}) => {
  const [userProfile, setUserProfile] = useState();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [canManage, setCanManage] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [checkPageAdmin, setcheckPageAdmin] = useState(false);
  const [isPageAdmin, setIsPageAdmin] = useState();

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUserProfile(null);
    }).catch((error) => {
      console.log(error);
    })
  }

  const ensureAuthorized = () => {
    auth.onAuthStateChanged(async (user) => {
      setIsAuthorized(user ? true : false);
      
      if (user && !userProfile) {
        if (user && user.email) {
          const userInfo = await UserService.getUserByEmail(user.email);
          const userProfile = userInfo ? {
            id: userInfo.id,
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            roles: userInfo.roles,
            isActive: userInfo.isActive,
          } : {
            email: user.email,
            isActive: false,
            roles: [ROLE.CLIENT]
          }
          setUserProfile(userProfile);
          const canManage = ROLE_MANAGEMENT.some(role => userProfile?.roles?.includes(role));
          setCanManage(canManage);
        }
      }
    });
  }

  useEffect(() => {
    ensureAuthorized();
  }, []);

  return <UserContext.Provider value={{
    userProfile, ensureAuthorized, isAuthorized, logout, 
    canManage, setCanManage, 
    isShow, setIsShow,
    checkPageAdmin, setcheckPageAdmin,
    isPageAdmin, setIsPageAdmin
  }}>{children}
        </UserContext.Provider>
}
