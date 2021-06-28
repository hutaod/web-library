import loadable from "@loadable/component";

const routes = [
  {
    path: "/about",
    component: loadable(() => import("../pages/About")),
  },
  {
    path: "/",
    component: loadable(() => import("../pages/Home")),
  },
];

export default routes;
