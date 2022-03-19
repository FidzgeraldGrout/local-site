import { createContext, useContext } from 'react';
import MOBXUser from '../../src/auth/mobx/mobxUser';

let mobxUser;
export const StoreContext = createContext();

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within StoreProvider')
  }

  return context
}

export function StoreProvider({ children, initialState: initialData }) {
  const context = initializeStore(initialData)

  return <StoreContext.Provider value={context}>{children}</StoreContext.Provider>
}

function initializeStore(initialData = null) {
  const _mobxUser = mobxUser ?? new MOBXUser()
  
  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialData) {
    _mobxUser.hydrate(initialData)
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _mobxUser
  // Create the store once in the client
  if (!mobxUser) mobxUser = _mobxUser

  return {
    MOBXUser: _mobxUser
  }
}
