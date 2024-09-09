import * as React from 'react'
import { auth } from "@config/firebase";
import { getAuth, signOut } from "firebase/auth";
import { UserService } from "../services/UserService";

const UserContext = React.createContext()
export const useUserContext = () => React.useContext(UserContext);

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({children}) => {
  const [userProfile, setUserProfile] = React.useState();
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUserProfile(null);
      console.log('Sign-out successful.')
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

  React.useEffect(() => {
    ensureAuthorized();
  }, []);

  return <UserContext.Provider value={{userProfile, ensureAuthorized, isAuthorized, logout}}>{children}
        </UserContext.Provider>
}
