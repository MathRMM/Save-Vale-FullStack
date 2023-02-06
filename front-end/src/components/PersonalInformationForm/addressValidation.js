const validations = { 
    zipCode: {
      custom: {
        isValid: (value) => parseInt(value?.length, 10) === 8,
        message: 'Digite um CEP válido',
      },
    },
  
    city: {
      custom: {
        isValid: (value) => isValidString(value.name),
        message: 'Digite uma cidade',
      },
    },
  
    neighborhood: {
      custom: {
        isValid: (value) => isValidString(value),
        message: 'Digite um bairro',
      },
    },
  
    street: {
      custom: {
        isValid: (value) => isValidString(value),
        message: 'Digite uma rua',
      },
    },
  
    state: {
      custom: {
        isValid: (value) => isValidString(value.name),
        message: 'Selecione um estado',
      },
    },
  
    number: {
      custom: {
        isValid: (value) => Number(value),
        message: 'Digite um número válido',
      },
    },

    instituteId: {
        custom: {
            isValid: (value) => Number(value),
            message: 'Precisa estar logado',
          },
    }

  };
  
  export default validations;
  
  function isValidString(value) {
    return value || value?.trim();
  }
  