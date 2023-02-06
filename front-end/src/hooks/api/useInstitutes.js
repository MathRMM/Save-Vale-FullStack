import useAsync from '../useAsync';

import { institutesApi } from '../../services/institutesApi';

export default function useInstitutes() {

  const {
    data: institutes,
    loading: institutesLoading,
    error: institutesError,
    act: getInstitutes,
  } = useAsync(() => institutesApi.getAllInstitutes());

  return {
    institutes,
    institutesLoading,
    institutesError,
    getInstitutes,
  };
}
