<template>
  <v-app>
    <!-- Conteúdo da página -->
    <v-main class="pt-0">
      <v-container>
        <!-- Barra de navegação -->
        <v-app-bar color="white" app>
          <img
            src="https://desafiosdaeducacao.com.br/wp-content/uploads/2017/08/1grupoa.png"
            alt="Grupo A logo"
            height="50"
            class="ml-4 mt-2 mb-2"
          />
          <v-container class="font-weight-bold text-left"
            >Módulo Acadêmico</v-container
          >
          <v-container
            @click="logout()"
            class="text-right mr-5"
            style="user-select: none; cursor: pointer"
          >
            <i class="material-icons">logout</i> Sair
          </v-container>
        </v-app-bar>

        <!-- Conteúdo da página principal -->
        <component
          :is="currentComponent"
          :item="editingItem"
          @navigateTo="navigateTo"
          @snackbar="showSnackBar"
        ></component>
      </v-container>
    </v-main>
    <!-- Menu lateral -->

    <v-navigation-drawer class="d-flex flex-column" app>
      <v-container>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                Menu principal
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <hr />
          <v-list-item link @click="navigateTo('StudentList')">
            <v-list-item-content>
              <v-list-item-title class="d-flex flex-row">
                <i class="material-icons mr-2">person</i>
                <div>Alunos</div></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import StudentList from "./student/StudentList";
import StudentCreate from "./student/StudentCreate";
export default {
  name: "MainView",
  data() {
    return {
      drawer: true,
      currentComponent: null,
      editingItem: null,
      snackbar: false,
      snackbarText: "",
    };
  },
  methods: {
    navigateTo(componentName, item = null) {
      this.currentComponent = componentName;
      if (item) {
        this.editingItem = item;
      }
    },

    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },

    showSnackBar(data) {
      this.snackbarText = data;
      this.snackbar = true;
    },
  },
  components: {
    StudentList,
    StudentCreate,
  },
};
</script>
