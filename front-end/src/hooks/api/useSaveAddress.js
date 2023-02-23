import useAsync from '../useAsync';
import useToken from '../useToken';

import * as addressApi from '../../services/addressApi';

export default function useSaveAddress() {
  const token = useToken();
  
  const {
    loading: saveAddressLoading,
    error: saveAddressError,
    act: saveAddress
  } = useAsync((data) => addressApi.save(data, token), false);

  return {
    saveAddressLoading,
    saveAddressError,
    saveAddress
  };
}
