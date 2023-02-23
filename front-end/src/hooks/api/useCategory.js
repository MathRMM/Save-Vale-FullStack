import useAsync from '../useAsync';

import * as categoryApi from '../../services/categoryApi';

export default function useCategory() {
  
  const {
    data: categories,
    loading: categoryLoading,
    error: categoryError,
    act: getCategory
  } = useAsync(() => categoryApi.getCategory());

  return {
    categories,
    categoryLoading,
    categoryError,
    getCategory
  };
}
