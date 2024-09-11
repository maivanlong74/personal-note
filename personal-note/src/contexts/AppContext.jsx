import { createContext, useContext, useState } from "react";


const AppContext = createContext()
export const useAppContext = () => useContext(AppContext);

// eslint-disable-next-line react/prop-types
export const AppWrapper = ({children}) => {
  const [errorMessage, setErrorMessage] = useState()

  return <AppContext.Provider value={{errorMessage, setErrorMessage}}>{children}
        </AppContext.Provider>
}
