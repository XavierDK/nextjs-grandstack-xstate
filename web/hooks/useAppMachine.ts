import { useState, useEffect } from 'react';
import config from '../constants/config';
import appMachine, { AppServiceType } from '../machines/app/appMachine';
import { useUser } from '@auth0/nextjs-auth0';
import { useMachine } from '@xstate/react';

const useAppMachine = (): AppServiceType => {
  const [state, setState] = useState({
    devTools: config.isDebugEnabled,
    user: undefined
  });

  const [, send, service] = useMachine(appMachine, { context: state });
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      setState({ ...state, user });
      send('USER_LOGIN');
    } else {
      setState({ ...state, user: undefined });
      send('USER_LOGOUT');
    }
  }, [user, send]);

  return service;
};

export default useAppMachine;
