import { createContext, useContext } from 'react';
import MOBXui from '../../src/mobx/mobxUI';
import MOBXuser from '../../src/mobx/mobxUser';

let mobxUser;
let mobxUI;
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
  const _mobxUser = mobxUser ?? new MOBXuser();
  const _mobxUI = mobxUI ?? new MOBXui();
  
  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialData) {
    _mobxUser.hydrate(initialData);
    _mobxUI.hydrate(initialData);
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return {
    MOBXUser: _mobxUser,
    MOBXui: _mobxUI
  }
  // Create the store once in the client
  if (!mobxUser) mobxUser = _mobxUser;
  if (!mobxUI) mobxUI = _mobxUI;

  return {
    MOBXUser: _mobxUser,
    MOBXui: _mobxUI
  }
}
