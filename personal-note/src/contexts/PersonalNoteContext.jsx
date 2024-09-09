import * as React from 'react'
import { useUserContext } from '@contexts/UserContext';
import { PersonalNoteStatus } from '@constants/status';

const PersonalNoteContext = React.createContext()
export const usePersonalNoteContext = () => React.useContext(PersonalNoteContext);

// eslint-disable-next-line react/prop-types
export const PersonalNoteProvider = ({children}) => {
  const { userProfile } = useUserContext();

  const [currentUser, setCurrentUser] = React.useState(null)
  const [personalNoteStatus, setPersonalNoteStatus] = React.useState(PersonalNoteStatus.IDLE)
  const [reload, setReload] = React.useState(null);

  const [memberOptions, setMemberOptions] = React.useState([])
  const [vehicleOptions, setVehicleOptions] = React.useState([])

  const initValues = {
      currentUser,
      personalNoteStatus, setPersonalNoteStatus,
      reload, setReload,
      memberOptions, setMemberOptions,
      vehicleOptions, setVehicleOptions,
  }

  React.useEffect(() => {
    if (userProfile) {
      setCurrentUser(userProfile)
    }
  }, [userProfile]);

  return <PersonalNoteContext.Provider value={initValues}>{children}
        </PersonalNoteContext.Provider>
}
