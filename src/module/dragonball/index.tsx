import { Detail } from "./page/Detail";
import { List } from "./page/List";

export const dragonballRouters = [
  {
    path: "/dragonball",
    element: <List />,
  },
  {
    path: "/dragonball/:id",
    element: <Detail />,
  },
];
