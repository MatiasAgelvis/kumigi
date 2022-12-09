import Avatara from "app/lib/avatara";
import { DefinedShapes } from "app/lib/shapes";
import { NextApiRequest } from "next";
import { Actions, State } from "use-undo";

export type OKey = string | number | symbol;

export type Shape = DefinedShapes | "text" | "random";

export type LayerNoId = {
  shape: Shape;
  color: string;
  text: string;
  font: string;
  display: boolean;
  id?: string;
  [x: string | number | symbol]: unknown;
};

export type Layer = {
  shape: Shape;
  color: string;
  text: string;
  font: string;
  display: boolean;
  id: string;
  [x: string | number | symbol]: unknown;
};

export type AvataraQuery = Partial<{
  height: string;
  width: string;
  sizes: string;
  colors: string;
  texts: string;
  fonts: string;
  shapes: Shape[];
}>;

export type ApiQuery = NextApiRequest["query"];

export type UseUndoType<T> = [State<T>, Actions<T>];

export interface NotNestedObject {
  [x: string]: number | boolean | string | null | undefined;
}
