const authRoutes = [
  {
    path: `/`,
    name: "loginPage",
    meta: {
      layout: "FullLayout",
    },
    component: () => import("@/views/auth/login"),
  },
];

export default authRoutes;
