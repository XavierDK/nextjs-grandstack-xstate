// https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum AppActionTypes {
  ToggleDrawer = 'TOGGLE_DRAWER'
}

// Drawer

type DrawerPayload = {
  [AppActionTypes.ToggleDrawer]: undefined;
};

export type DrawerActions = ActionMap<DrawerPayload>[keyof ActionMap<DrawerPayload>];

export const drawerReducer = (state: boolean, action: DrawerActions): boolean => {
  switch (action.type) {
    case AppActionTypes.ToggleDrawer:
      return !state;
    default:
      return state;
  }
};
