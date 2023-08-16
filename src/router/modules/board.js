const boardRoutes = [
  {
    path: `/board`,
    name: "boardList",
    meta: {
      layout: "MainLayout",
    },
    component: () => import("@/views/board"),
  },
];

export default boardRoutes;
