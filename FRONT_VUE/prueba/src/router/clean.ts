import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config"; 

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboard"],
        },
      },

      /** usuarios**/
      {
        path: "/users",
        name: "users-list",
        component: () => import("@/views/users/Index.vue"),
        meta: {
          pageTitle: "Usuarios",
          breadcrumbs: ["Usuarios"],
          admin: false,
        },
      },
      {
        path: "/users/:id",
        name: "users-edit",
        component: () => import("@/views/users/Edit.vue"),
        meta: {
          pageTitle: "Editar usuario",
          breadcrumbs: ["Editar usuario"],
          admin: false,
        },
      },
      {
        path: "/users/create",
        name: "users-create",
        component: () => import("@/views/users/Create.vue"),
        meta: {
          pageTitle: "Crear usuario",
          breadcrumbs: ["Crear usuario"], 
          admin: false,
        },
      },

       


      
     
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
        meta: {
          pageTitle: "Entrar",
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
        meta: {
          pageTitle: "Registrarse",
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

    
  

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig(); 

  // before page access check if page requires authentication
   
  if (to.meta.middleware == "auth") {
    
   
    
    if (authStore.isAuthenticated) { 
      if (to.meta.admin && !authStore.isAdmin) {
        next({ name: "dashboard" });
      } else {
        next();
      }
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
