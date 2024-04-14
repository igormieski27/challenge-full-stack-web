<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mt-12 pa-12">
          <v-img
            :width="300"
            aspect-ratio="16/9"
            cover
            class="mx-auto"
            src="https://maisaedu.com.br/hubfs/site-grupo-a/logo-mais-a-educacao.svg"
          ></v-img>
          <v-card-title
            class="text-center mt-2 mb-1"
            style="font-weight: 300; font-size: 25px; font-stretch: expanded"
            >Cadastro</v-card-title
          >
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field
                v-model="user.name"
                label="Nome"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="user.email"
                label="E-mail"
                :rules="[
                  rules.required,
                  rules.email,
                  rules.emailMaxLength,
                  rules.noSpaces,
                ]"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                label="Senha"
                type="password"
                outlined
                required
                :rules="[passwordRules]"
              ></v-text-field>
              <v-text-field
                v-model="user.confirmPassword"
                label="Confirmar Senha"
                type="password"
                outlined
                required
              ></v-text-field>
              <v-btn
                type="submit"
                block
                color="secondary"
                :disabled="
                  !user.name ||
                  !user.email ||
                  !user.password ||
                  !user.confirmPassword
                "
              >
                Cadastrar
              </v-btn>
              <v-btn block class="mt-2" color="primary" @click="voltar()">
                Voltar
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar v-model="snackbar">
    {{ snackText }}

    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">
        Fechar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import router from "../../router";
import UserService from "../../services/UserService";
import validationRules from "../../services/validationRules.js";

export default {
  name: "RegisterView",
  data() {
    return {
      snackText: "",
      snackbar: false,
      user: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      rules: {
        ...validationRules,
        nameMaxLength: (value) =>
          value.length <= 32 || "(*) O nome deve ter no máximo 32 caracteres.",
        emailMaxLength: (value) =>
          value.length <= 64 ||
          "(*) O e-mail deve ter no máximo 64 caracteres.",
      },
    };
  },
  methods: {
    async register() {
      const { name, email, password, confirmPassword } = this.user;

      if (!name || !email || !password || !confirmPassword) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      if (password !== confirmPassword) {
        alert("As senhas não coincidem.");
        return;
      }

      try {
        // eslint-disable-next-line
        const response = await UserService.createUser({
          name,
          email,
          password,
        });
        this.user.name = "";
        this.user.email = "";
        this.user.password = "";
        this.user.confirmPassword = "";
        router.push("/");
        this.snackText =
          "Usuário cadastrado com sucesso! Faça login para continuar.";
        this.snackbar = true;
      } catch (error) {
        if (
          error.response &&
          error.response.status === 500 &&
          error.response.data.error.includes("users_email_unique")
        ) {
          this.snackText =
            "O e-mail informado já está sendo usado por outro usuário. Por favor, escolha um e-mail diferente.";
          this.snackbar = true;
        } else {
          this.snackText =
            "Erro ao cadastrar usuário. Por favor, tente novamente.";
          this.snackbar = true;
          console.error(error);
        }
      }
    },

    voltar() {
      router.push("/");
    },
  },
};
</script>
