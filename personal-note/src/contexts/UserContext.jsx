import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@config/firebase";
import { getAuth, signOut } from "firebase/auth";
import { UserService } from "../services/UserService";


const UserContext = createContext()
export const useUserContext = () => useContext(UserContext);

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({children}) => {
  const [userProfile, setUserProfile] = useState();
  const [isAuthorized, setIsAuthorized] = useState(false);

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
          if(userInfo){
            setUserProfile({
              id: userInfo.id,
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              roles: userInfo.roles,
              isActive: userInfo.isActive,
            })
          }else{
            setUserProfile({
              email: user.email,
              isActive: false,
            });
          }
        }
      }
    });
  }

  useEffect(() => {
    ensureAuthorized();
  }, []);

  return <UserContext.Provider value={{userProfile, ensureAuthorized, isAuthorized, logout}}>{children}
        </UserContext.Provider>
}
