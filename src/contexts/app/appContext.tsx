import React, { createContext, useReducer, Dispatch, ReactElement } from 'react';
import { drawerReducer, DrawerActions } from './appReducers';

type InitialStateType = {
  isDrawerOpened: boolean;
};

const initialState = {
  isDrawerOpened: false
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<DrawerActions>;
}>({
  state: initialState,
  dispatch: () => null
});

const mainReducer = ({ isDrawerOpened }: InitialStateType, action: DrawerActions) => ({
  isDrawerOpened: drawerReducer(isDrawerOpened, action)
});

type Props = {
  children: null | ReactElement | ReactElement[];
};

const AppProvider: React.FC = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
