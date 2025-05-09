import { createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from '@contexts/UserContext';
import { PersonalNoteStatus } from '@constants/status';
import Loading from '@components/Loading/Loading';

const PersonalNoteContext = createContext()
export const usePersonalNoteContext = () => useContext(PersonalNoteContext);

// eslint-disable-next-line react/prop-types
export const PersonalNoteProvider = ({children}) => {
  const { userProfile } = useUserContext();
  
  const [currentUser, setCurrentUser] = useState(null)
  const [personalNoteStatus, setPersonalNoteStatus] = useState(PersonalNoteStatus.IDLE)
  const [reload, setReload] = useState(null);

  const [memberOptions, setMemberOptions] = useState([])
  const [vehicleOptions, setVehicleOptions] = useState([])

  const initValues = {
      currentUser,
      personalNoteStatus, setPersonalNoteStatus,
      reload, setReload,
      memberOptions, setMemberOptions,
      vehicleOptions, setVehicleOptions,
  }

  useEffect(() => {
    if (userProfile) {
      setCurrentUser(userProfile)
      }
  }, [userProfile]);

  return <PersonalNoteContext.Provider value={initValues}>
          {personalNoteStatus === PersonalNoteStatus.LOADING && <Loading personalNoteStatus={personalNoteStatus} />}
          {children}
        </PersonalNoteContext.Provider>
}
