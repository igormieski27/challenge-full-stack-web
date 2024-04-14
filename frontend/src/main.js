import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const myCustomLightTheme = {
  dark: false,
  colors: {
    primary: "#f44336",
    secondary: "#009688",
    accent: "#03a9f4",
    error: "#ffc107",
    warning: "#ffeb3b",
    info: "#cddc39",
    success: "#4caf50",
  },
};

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "myCustomLightTheme",
    themes: {
      myCustomLightTheme,
    },
  },
  icons: {
    defaultSet: "mdi",
  },
});
createApp(App).use(router).use(vuetify).mount("#app");
