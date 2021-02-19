import { useService } from '@xstate/react';
import { useContext } from 'react';
import { AppContext } from '../providers/AppProvider';

const useAppService = () => {
  const service = useContext(AppContext);
  return useService(service);
};

export default useAppService;
