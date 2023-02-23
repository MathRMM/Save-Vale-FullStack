import useAsync from '../useAsync';
import useToken from '../useToken';

import * as addressApi from '../../services/addressApi';

export default function useAddress() {
  const token = useToken();
  
  const {
    data: address,
    loading: addressLoading,
    error: addressError,
    act: getAddress
  } = useAsync(() => addressApi.getAddress(token));

  return {
    address,
    addressLoading,
    addressError,
    getAddress
  };
}
