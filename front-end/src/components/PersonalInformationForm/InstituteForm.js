import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
//import { toast } from 'react-toastify';
import MenuItem from '@mui/material/MenuItem';

import useEnrollment from '../../hooks/api/useEnrollment';
import useSaveEnrollment from '../../hooks/api/useSaveEnrollment';
import { useForm } from '../../hooks/useForm';

import Input from '../Form/Input';
import Button from '../Form/Button';
import Select from '../Form/Select';
import { FormWrapper } from './FormWrapper';
import { InputWrapper } from './InputWrapper';
import { ErrorMsg } from './ErrorMsg';
import instituteValidation from "./InstituteValidations"

export default function InstituteForm() {
  const [dynamicInputIsLoading, setDynamicInputIsLoading] = useState(false);
  const { enrollment } = useEnrollment();
  const { saveEnrollmentLoading, saveEnrollment } = useSaveEnrollment();

  const { handleSubmit, handleChange, data, errors, setData, customHandleChange } = useForm({
    validations: instituteValidation,

    onSubmit: async (data) => {
      const newData = {
        name: data.name,
        withdraw: data.withdraw,
        description: data.description,
        image: data.image,
      };

      try {
        await saveEnrollment(newData);
        //toast('Informações salvas com sucesso!');
      } catch (err) {
        //toast('Não foi possível salvar suas informações!');
      }
    },

    initialValues: {
      name: '',
      withdraw: '',
      description: '',
      image: '',
    },
  });

  useEffect(() => {
    if (enrollment) {
      setData({
        name: enrollment.name,
        withdraw: enrollment.withdraw,
        description: enrollment.description,
        image: enrollment.image,
      });
    }
  }, [enrollment]);

  return (
    <>
      <StyledTypography variant="h4">Informações do Instituto</StyledTypography>
      <FormWrapper onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            placeholder="Nome Completo"
            name="name"
            type="text"
            value={data?.name || ''}
            onChange={handleChange('name')}
          />
          {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder="Descreva sobre a instiuição"
            name="description"
            type="text"
            value={data?.description || ''}
            onChange={handleChange('description')}
          />
          {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder="Link de uma foto do local"
            name="image"
            type="text"
            value={data?.image || ''}
            onChange={handleChange('image')}
          />
          {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
        </InputWrapper>
        <InputWrapper>
          <Select
            label="Possui um sistema para buscar a doação?"
            name="withdraw"
            id="withdraw"
            value={data?.withdraw || ''}
            onChange={handleChange('withdraw')}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={true}>
              <em>Sim</em>
            </MenuItem>
            <MenuItem value={false}>
              <em>Não</em>
            </MenuItem>
          </Select>
          {errors.state && <ErrorMsg>{errors.state}</ErrorMsg>}
        </InputWrapper>

        <SubmitContainer>
          <Button type="submit" disabled={dynamicInputIsLoading || saveEnrollmentLoading}>
            Salvar
          </Button>
        </SubmitContainer>
      </FormWrapper>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;
