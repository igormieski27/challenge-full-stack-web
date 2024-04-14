<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div style="padding: 10px; display: flex">
          <v-icon class="mr-2">mdi-account-search</v-icon>
          <h3>Consulta de Alunos</h3>
          <v-btn
            class="w-20 mr-2 mb-auto ml-auto"
            color="secondary"
            prepend-icon="mdi-account-plus"
            @click="changeComponent('StudentCreate')"
          >
            <template v-slot:prepend>
              <v-icon></v-icon>
            </template>
            Cadastrar Aluno
          </v-btn>
        </div>
        <hr />
      </v-col>
    </v-row>
    <v-card style="border: none; box-shadow: none">
      <template v-slot:text>
        <div style="display: flex; align: center">
          <v-text-field
            v-model="search"
            label="Pesquisar aluno (RA, Nome ou CPF)"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            single-line
          ></v-text-field>
        </div>
      </template>
      <v-data-table
        :headers="headers"
        :items="students"
        :sort-by="[{ key: 'ra', order: 'desc' }]"
        :search="search"
        class="text-left"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                size="small"
                class="mr-2 edit-icon"
                icon
                v-bind="props"
                @click="editStudent(item)"
              >
                <v-icon> mdi-pencil </v-icon>
              </v-btn>
            </template>
            <span>Editar</span>
          </v-tooltip>
          <v-tooltip location="bottom">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                size="small"
                icon
                v-bind="activatorProps"
                @click="
                  dialog = true;
                  idDelete = item.ra;
                "
                class="delete-icon"
              >
                <v-icon> mdi-delete </v-icon>
              </v-btn>
            </template>
            <span>Remover</span>
          </v-tooltip>
          <v-dialog v-model="dialog" max-width="400">
            <v-card
              prepend-icon="mdi-delete"
              text="O registro será perdido para sempre."
              title="Deseja excluir esse estudante?"
            >
              <v-spacer></v-spacer>
              <v-container class="d-flex">
                <v-btn color="primary" @click="dialog = false">
                  Cancelar
                </v-btn>
                <v-btn
                  class="ml-auto"
                  color="secondary"
                  @click="deleteStudent(idDelete)"
                >
                  Confirmar
                </v-btn>
              </v-container>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import StudentService from "../../../services/StudentsService.js";
export default {
  name: "StudentList",
  data() {
    return {
      search: "",
      dialog: false,
      idDelete: 0,
      students: [],
      headers: [
        {
          title: "RA",
          align: "start",
          key: "ra",
        },
        { title: "Nome", key: "name" },
        { title: "CPF", key: "cpf", sortable: false },
        { title: "E-mail", key: "email", sortable: false },
        { title: "Ações", key: "actions", sortable: false },
      ],
      currentComponent: null,
    };
  },
  methods: {
    changeComponent(componentName) {
      this.$emit("navigateTo", componentName);
    },

    emitSnackbar(text) {
      this.$emit("snackbar", text);
    },
    async fetchStudents() {
      try {
        const response = await StudentService.getStudents();
        this.students = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async deleteStudent(ra) {
      try {
        await StudentService.deleteStudent(ra);
        this.fetchStudents();
        this.dialog = false;
      } catch (error) {
        console.error(error);
      }
    },

    editStudent(item) {
      this.$emit("navigateTo", "StudentCreate", item);
    },
  },
  mounted() {
    this.fetchStudents();
  },
};
</script>

<style scoped>
.table-actions button {
  margin-right: 8px;
}

.v-icon {
  transition: all 0.3s ease;
}

.edit-icon:hover {
  color: #2266ff;
}

.delete-icon:hover {
  color: red;
}
</style>
