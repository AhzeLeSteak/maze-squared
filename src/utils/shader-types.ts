type Split<S extends string, D extends string> =
  string extends S ? string[] :
    S extends "" ? [] :
      S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] : [S];

type FilterTuple<Tuple extends any[], ToRemove = never> =
  Tuple extends [infer Elem]
    ? Elem extends ToRemove ? [] : Tuple
    : Tuple extends [infer First, ...infer Rest]
      ? First extends ToRemove ? FilterTuple<Rest, ToRemove> : [First, ...FilterTuple<Rest, ToRemove>]
      : [];


type LineToObject<S> =
  S extends `uniform ${infer Type} ${infer Name}[${infer Size}];`
    ? Name
    : S extends `uniform ${infer Type} ${infer Name};`
      ? Name
      : never;

type MapToUniform<TArray extends any[], Ttype extends "uniform" | "attribute"> =
  TArray extends [infer Elem]
    ? LineToObject<Elem>
    : TArray extends [infer First, ...infer Rest]
      ? LineToObject<First> | MapToUniform<Rest, Ttype>
      : never;


type ShaderLines<TShader extends string> = Split<TShader, "\n">;

export type ShaderInfo<TShader extends string> =
  MapToUniform<ShaderLines<TShader>, "attribute"> |
  MapToUniform<ShaderLines<TShader>, "uniform">;
