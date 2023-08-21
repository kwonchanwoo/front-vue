const boardRoutes = [
  {
    path: `/board`,
    name: "boardList",
    meta: {
      layout: "MainLayout",
    },
    component: () => import("@/views/board"),
  },
  {
    path: `/board/detail`,
    name: "boardAdd",
    meta: {
      layout: "MainLayout",
    },
    component: () => import("@/views/board/detail"),
  },
  {
    path: `/board/detail/:id`,
    name: "boardDetail",
    meta: {
      layout: "MainLayout",
    },
    component: () => import("@/views/board/detail"),
  },
];

export default boardRoutes;
