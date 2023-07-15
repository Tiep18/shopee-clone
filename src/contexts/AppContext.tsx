import { createContext, useState } from 'react'
import { ExtraPurchase } from 'src/types/purchase.type'
import User from 'src/types/user.type'
import { getAccessTokenFromLS, getUserFromLS } from 'src/utils/auth'

interface InitialContext {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  extraPurchaseList: ExtraPurchase[]
  setExtraPurchaseList: React.Dispatch<React.SetStateAction<ExtraPurchase[]>>
  reset: () => void
}

const initialAppContext: InitialContext = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  user: getUserFromLS(),
  setUser: () => null,
  extraPurchaseList: [],
  setExtraPurchaseList: () => null,
  reset: () => null
}
export const AppContextProvider = createContext(initialAppContext)

export default function AppContext({
  children
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated
  )
  const [user, setUser] = useState<User>(initialAppContext.user)
  const [extraPurchaseList, setExtraPurchaseList] = useState<ExtraPurchase[]>(
    initialAppContext.extraPurchaseList
  )

  const reset = () => {
    setIsAuthenticated(false), setExtraPurchaseList([])
  }
  return (
    <AppContextProvider.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        extraPurchaseList,
        setExtraPurchaseList,
        reset
      }}
    >
      {children}
    </AppContextProvider.Provider>
  )
}
