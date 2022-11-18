import Avatara from "app/lib/avatara";
import { DefinedShapes } from "app/lib/shapes";
import { NextApiRequest } from "next";

export type OKey = string | number | symbol;

export type Shape = DefinedShapes | "text" | "random";

export type Layer = {
  shape: Shape | null;
  color: string;
  text: string;
  font: string;
  display: boolean;
  id?: string;
  [x: string | number | symbol]: unknown;
};

export type AvataraQuery = Partial<{
  height: string;
  width: string;
  colors: string;
  texts: string;
  fonts: string;
  shapes: Shape[];
}>;

export type ApiQuery = NextApiRequest["query"];

export type UseUndoType<T> = [State<T>, Actions<T>];
