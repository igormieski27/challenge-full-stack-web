import { createRouter, createWebHistory } from "vue-router";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import MainView from "./views/crud/MainView";
import StudentList from "./views/crud/student/StudentList";
import StudentCreate from "./views/crud/student/StudentCreate";
import UserService from "./services/UserService";

const routeInfos = [
  {
    path: "/",
    component: LoginView,
  },
  {
    path: "/register",
    component: RegisterView,
  },
  {
    path: "/main",
    component: MainView,
    meta: { requiresAuth: true },
  },
  {
    path: "/student-list",
    name: "StudentList",
    component: StudentList,
    meta: { requiresAuth: true },
  },
  {
    path: "/student-create",
    name: "StudentCreate",
    component: StudentCreate,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routeInfos,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!UserService.isLoggedIn()) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
