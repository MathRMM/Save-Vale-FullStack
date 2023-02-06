import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import MenuItem from '@mui/material/MenuItem';

import useCep from '../../hooks/api/useCep';
import useAddress from '../../hooks/api/useAddress';
import useSaveAddress from '../../hooks/api/useSaveAddress';
import useEnrollment from '../../hooks/api/useEnrollment';
import { useForm } from '../../hooks/useForm';

import Input from '../Form/Input';
import Button from '../Form/Button';
import Select from '../../components/Form/Select';
import { FormWrapper } from './FormWrapper';
import { InputWrapper } from './InputWrapper';
import { ErrorMsg } from './ErrorMsg';
import { ufList } from './ufList';
import AddressValidation from './addressValidation';

export default function AddressForm() {
  const [dynamicInputIsLoading, setDynamicInputIsLoading] = useState(false);
  const { getCep } = useCep();
  const { address } = useAddress();
  const { enrollment } = useEnrollment();
  const { saveAddressLoading, saveAddress } = useSaveAddress();

  const { handleSubmit, handleChange, data, errors, setData, customHandleChange } = useForm({
    validations: AddressValidation,

    onSubmit: async (data) => {
      const newData = {
        zipCode: data.zipCode,
        instituteId: data.instituteId,
        street: data.street,
        city: data.city,
        number: data.number,
        state: data.state,
        neighborhood: data.neighborhood,
        addressDetail: data.addressDetail,
      };

      try {
        await saveAddress(newData);
        toast('Informações salvas com sucesso!');
      } catch (err) {
        toast('Não foi possível salvar suas informações!');
      }
    },

    initialValues: {
      instituteId: '',
      street: '',
      zipCode: '',
      city: {
        name: '',
        zoneId: '',
      },
      number: '',
      state: {
        name: '',
      },
      neighborhood: '',
      addressDetail: '',
    },
  });

  useEffect(() => {
    if (address) {
        
      setData({
        instituteId: address.instituteId,
        zipCode: address.zipCode,
        street: address.street,
        city: address.city,
        number: address.number,
        state: address.state,
        neighborhood: address.neighborhood,
        addressDetail: address.addressDetail,
      });
    }
    if (enrollment && !address) {
        setData({
          ...data,
          instituteId: enrollment.id,
        });
      }
  }, [address, enrollment]);

  function isValidCep(cep) {
    return cep.length === 8;
  }

  async function handleCepChanges(event) {
    const { name, value } = event.target;

    const valueWithoutMask = value.replace('-', '');

    if (isValidCep(valueWithoutMask)) {
      const newDataValues = {
        ...data,
        [name]: value,
      };

      setDynamicInputIsLoading(true);
      try {
        const cepData = await getCep(valueWithoutMask);
        setDynamicInputIsLoading(false);

        setData({
          ...newDataValues,
          zipCode: cepData.zipCode,
          street: cepData.street,
          city: cepData.city,
          neighborhood: cepData.neighborhood,
          state: cepData.state,
        });
      } catch (error) {
        toast('A sua região ainda não recebe suporte');
      }
    }
  }

  

  return (
    <>
      <StyledTypography variant="h4">Endereço</StyledTypography>
      <FormWrapper onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            placeholder="CEP"
            name="zipCode"
            mask="99999-999"
            value={data?.zipCode || ''}
            onChange={(e) => {
              handleChange('zipCode')(e);
              handleCepChanges(e);
            }}
          />
          {errors.cep && <ErrorMsg>{errors.cep}</ErrorMsg>}
        </InputWrapper>
        <InputWrapper>
          <Select label="Estado" name="state" id="state" value={data?.city?.state?.name|| ''} onChange={handleChange('state')}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {ufList.map((uf) => (
              <MenuItem value={uf.name} key={uf.id}>
                <em>{uf.name}</em>
              </MenuItem>
            ))}
          </Select>
          {errors.state && <ErrorMsg>{errors.state}</ErrorMsg>}
        </InputWrapper>

        <InputWrapper>
          <Input
            placeholder="Cidade"
            name="city"
            value={data?.city?.name || ''}
            onChange={handleChange('city')}
            disabled={dynamicInputIsLoading}
          />
          {errors.city && <ErrorMsg>{errors.city}</ErrorMsg>}
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder="Rua"
            name="street"
            value={data?.street || ''}
            onChange={handleChange('street')}
            disabled={dynamicInputIsLoading}
          />
          {errors.street && <ErrorMsg>{errors.street}</ErrorMsg>}
        </InputWrapper>

        <InputWrapper>
          <Input placeholder="Número" name="number" value={data?.number || ''} onChange={handleChange('number')} />
          {errors.number && <ErrorMsg>{errors.number}</ErrorMsg>}
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder="Bairro"
            name="neighborhood"
            value={data?.neighborhood || ''}
            onChange={handleChange('neighborhood')}
            disabled={dynamicInputIsLoading}
          />
          {errors.neighborhood && <ErrorMsg>{errors.neighborhood}</ErrorMsg>}
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder="Complemento"
            name="addressDetail"
            value={data?.addressDetail || ''}
            onChange={handleChange('addressDetail')}
          />
        </InputWrapper>

        <SubmitContainer>
          <Button type="submit" disabled={dynamicInputIsLoading || saveAddressLoading}>
            Salvar
          </Button>
        </SubmitContainer>
      </FormWrapper>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  margin-top: 20px !important;
`;

const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;
