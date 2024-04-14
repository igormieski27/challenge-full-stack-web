<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container class="d-flex flex-column">
        <v-text-field
          class="shrink"
          :is="edit"
          v-model="student.ra"
          label="RA"
          :disabled="true"
        ></v-text-field>

        <v-text-field
          v-model="student.name"
          :rules="[rules.required, rules.nameMaxLength]"
          label="Nome *"
          required
        ></v-text-field>

        <v-text-field
          v-model="student.email"
          :rules="[
            rules.required,
            rules.email,
            rules.emailMaxLength,
            rules.noSpaces,
          ]"
          label="E-mail *"
          required
        ></v-text-field>

        <v-text-field
          ref="cpf"
          v-model="student.cpf"
          v-maska:[cpfMask]
          :rules="[rules.required, rules.cpf]"
          label="CPF *"
          required
        ></v-text-field>
        <v-container class="d-flex flex-column">
          <v-btn
            class="w-25 mx-auto"
            size="large"
            :disabled="!valid"
            color="secondary"
            @click="submit"
          >
            Salvar
          </v-btn>
          <v-btn class="w-20 mx-auto mt-2" color="primary" @click="cancel()">
            Cancelar
          </v-btn>
        </v-container>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import { vMaska } from "maska";
import StudentService from "../../../services/StudentsService.js";
import validationRules from "../../../services/validationRules.js";

export default {
  directives: { maska: vMaska },
  name: "StudentForm",

  props: ["item"],
  data: () => ({
    valid: true,
    timeout: 5000,
    edit: false,
    snackbarCreate: false,
    snackBarCreateText: "",
    student: {
      ra: "",
      name: "",
      email: "",
      cpf: "",
    },
    cpfMask: { mask: "###.###.###-##" },
    rules: {
      ...validationRules,
      nameMaxLength: (value) =>
        value.length <= 32 || "(*) O nome deve ter no máximo 32 caracteres.",
      emailMaxLength: (value) =>
        value.length <= 64 || "(*) O e-mail deve ter no máximo 64 caracteres.",
    },
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if (this.edit) {
          // eslint-disable-next-line
          StudentService.updateStudent(this.student.ra, this.student)
            .then((response) => {
              console.log(response.data);
              this.student = {
                RA: "",
                name: "",
                email: "",
                cpf: "",
              };
              this.emitSnackbar("Aluno editado com sucesso!");
              this.changeComponent("StudentList");
            })
            .catch((error) => {
              console.error("There was an error!", error);
              this.emitSnackbar("Ocorreu um erro ao editar o aluno.");
            });
        } else {
          // eslint-disable-next-line
          StudentService.createStudent(this.student)
            .then((response) => {
              console.log(response.data);

              this.student = {
                RA: "",
                name: "",
                email: "",
                cpf: "",
              };
              this.emitSnackbar("Aluno cadastrado com sucesso!");
              this.changeComponent("StudentList");
            })
            .catch((error) => {
              console.error("There was an error!", error);
              this.emitSnackbar("Ocorreu um erro ao cadastrar o aluno.");
            });
        }
      }
    },

    cancel() {
      this.student = {
        RA: "",
        name: "",
        email: "",
        cpf: "",
      };
      this.changeComponent("StudentList");
    },

    changeComponent(componentName) {
      this.$emit("navigateTo", componentName);
    },

    emitSnackbar(text) {
      this.$emit("snackbar", text);
    },
  },

  mounted() {
    if (this.item && this.item.ra) {
      this.edit = true;
      this.student = this.item;
    }
  },
};
</script>
