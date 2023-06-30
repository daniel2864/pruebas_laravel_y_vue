import { getAssetPath } from "@/core/helpers/assets";
import { useAuthStore } from "@/stores/auth";

const store = useAuthStore()

const LISTAR_TEXT = "Listar"
const CREAR_TEXT = "Crear"

export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  svgIcon?: string;
  fontIcon?: string;
  sub?: Array<MenuItem>;
}

const adminPages: MenuItem[] = []

if (store.isAdmin) {
  
  // adminPages.push(...[

  //   {
  //     heading: "Usuarios",
  //     route: "/users",
  //     svgIcon: getAssetPath("media/icons/duotune/general/gen049.svg"),
  //     fontIcon: "bi-app-indicator",
  //   },
    
  // ])
}

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "Dashboard",
        route: "/dashboard",
        svgIcon: getAssetPath("media/icons/duotune/general/gen001.svg"),
        fontIcon: "bi-app-indicator",
      },
 
 

      /**usuarios**/
      {
        heading: "Usuarios",
        route: "/users",
        svgIcon: getAssetPath("media/icons/duotune/abstract/abs027.svg"),
        fontIcon: "bi-app-indicator",
      },
      ...adminPages
    ],
  },
]

export default MainMenuConfig;
