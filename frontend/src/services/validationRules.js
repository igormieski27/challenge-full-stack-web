// validationRules.js
export default {
  required: (value) => !!value || "(*) Campo obrigatório.",
  email: (value) => /.+@.+\..+/.test(value) || "(*) E-mail inválido.",
  cpf: (value) => {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return (
      regex.test(value) || "(*) CPF inválido. Formato esperado: 000.000.000-00"
    );
  },
  maxLength: (value, maxLength) =>
    value.length <= maxLength ||
    `(*) O campo deve ter no máximo ${maxLength} caracteres.`,
  noSpaces: (value) =>
    !/\s/.test(value) || "(*) O campo não pode conter espaços em branco.",
};
