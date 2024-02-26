import { Detail } from "./page/Detail";
import { List } from "./page/List";

export const digimonRouters = [
  {
    path: "/digimon",
    element: <List />,
  },
  {
    path: "/digimon/:id",
    element: <Detail />,
  },
];
