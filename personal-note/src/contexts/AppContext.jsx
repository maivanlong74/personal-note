import * as React from 'react'

const AppContext = React.createContext()
export const useAppContext = () => React.useContext(AppContext);

// eslint-disable-next-line react/prop-types
export const AppWrapper = ({children}) => {
  const [errorMessage, setErrorMessage] = React.useState()

  return <AppContext.Provider value={{errorMessage, setErrorMessage}}>{children}
        </AppContext.Provider>
}
