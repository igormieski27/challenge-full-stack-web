<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card style="top: 15%" class="pa-12">
          <v-img
            :width="300"
            aspect-ratio="16/9"
            cover
            class="mx-auto"
            src="https://maisaedu.com.br/hubfs/site-grupo-a/logo-mais-a-educacao.svg"
            style="user-select: none"
          ></v-img>
          <v-card-title
            class="text-center mt-2"
            style="
              font-weight: 300;
              font-size: 25px;
              font-stretch: expanded;
              user-select: none;
            "
            >Módulo Acadêmico</v-card-title
          >
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="E-mail"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Senha"
                type="password"
                outlined
                required
              ></v-text-field>
              <v-btn
                @click="login(email, password)"
                block
                color="primary"
                :disabled="!email || !password"
              >
                Login
              </v-btn>
              <v-btn
                v-on:click="register()"
                class="mt-2"
                block
                color="secondary"
              >
                Cadastro
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from "../../router";
import UserService from "../../services/UserService";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login(email, password) {
      if (!email || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
      }
      try {
        const response = await UserService.loginUser({
          email: this.email,
          password: this.password,
        });
        localStorage.setItem("token", response.data.token);
        router.push("/main");
        return response.status;
      } catch (error) {
        alert("E-mail ou senha inválidos. Por favor, tente novamente.");
        console.error(error);
      }
    },
    register() {
      router.push("/register");
    },
  },
};
</script>

<style scoped></style>
