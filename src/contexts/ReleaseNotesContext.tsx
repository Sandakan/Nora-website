import { createContext } from "react";
import { Changelog } from "../@types/app";

const ReleaseNotesContext = createContext<Changelog | undefined>(
  {} as Changelog,
);

export default ReleaseNotesContext;
