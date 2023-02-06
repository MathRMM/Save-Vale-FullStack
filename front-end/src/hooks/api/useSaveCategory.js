import useAsync from '../useAsync';
import useToken from '../useToken';

import * as categoryApi from '../../services/categoryApi';

export default function useSaveCategory() {
  const token = useToken();
  
  const {
    loading: saveCategoryLoading,
    error: saveCategoryError,
    act: saveCategory
  } = useAsync((data) => categoryApi.save(data, token), false);

  return {
    saveCategoryLoading,
    saveCategoryError,
    saveCategory
  };
}
