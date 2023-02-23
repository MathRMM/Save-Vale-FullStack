const validations = {
  name: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite um nome válido',
    },
  },

  withdraw: {
    custom: {
        isValid: (value) => isValidString(value),
        message: 'Digite um nome válido',
      },
  },
  description: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite uma descrição válido',
    },
  },
  image: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite um link válido',
    },
  },
};

export default validations;

function isValidString(value) {
  return value || value?.trim();
}
