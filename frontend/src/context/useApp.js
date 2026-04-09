import { useContext } from "react";
import { AppContext } from "./appContextInstance";

export const useApp = () => useContext(AppContext);
