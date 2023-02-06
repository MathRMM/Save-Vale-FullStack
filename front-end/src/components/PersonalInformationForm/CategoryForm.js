import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import MenuItem from '@mui/material/MenuItem';

import useCategory from '../../hooks/api/useCategory';
import useSaveCategory from '../../hooks/api/useSaveCategory';
import useEnrollment from '../../hooks/api/useEnrollment';
import { useForm } from '../../hooks/useForm';

import Button from '../Form/Button';
import Select from '../Form/Select';
import { FormWrapper } from './FormWrapper';
import { InputWrapper } from './InputWrapper';

export default function CategoryForm() {
  const [dynamicInputIsLoading, setDynamicInputIsLoading] = useState(false);
  const { categories } = useCategory();
  console.log(categories)
  const [categoriesState, setCatState] = useState([])
  const { enrollment } = useEnrollment();
  const { saveCategoryLoading, saveCategory } = useSaveCategory();

  const { handleSubmit, handleChange, data, errors, setData, customHandleChange } = useForm({
    onSubmit: async (data) => {
      const newData = {
        instituteId: data.instituteId,
        categoryId: data.categoryId,
      };

      try {
        await saveCategory(newData);
        toast('Informações salvas com sucesso!');
      } catch (err) {
        toast('Não foi possível salvar suas informações!');
      }
    },

    initialValues: {
      instituteId: '',
      categoryId: '',
    },
  });
  useEffect(() => {
    if (enrollment) {
      setData({
        ...data,
        instituteId: enrollment.id,
      });
    }
    if (categories){
      setCatState(categories)
    }
  }, [enrollment, categories]);

  return (
    <>
      <StyledTypography variant="h4">Categoria</StyledTypography>
      <FormWrapper onSubmit={handleSubmit}>
        <InputWrapper>
            <Select value={data.categoryId|| ''} onChange={handleChange('categoryId')}>
            {categoriesState.map((category) => (
              <MenuItem value={category?.id} key={category?.id}>
                <em>{category?.name}</em>
              </MenuItem>
            ))}
            </Select>
        </InputWrapper>

        <SubmitContainer>
          <Button type="submit" disabled={dynamicInputIsLoading || saveCategoryLoading}>
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
