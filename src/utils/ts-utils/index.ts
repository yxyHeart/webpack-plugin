/** Partial */
type _Partial<T> = {
  [P in keyof T]?: T[P];
};

type _Required<T> = {
  [P in keyof T]-?: T[P];
};

type _Readonly<T> = {
  [P in keyof T]: T[P];
};

type _Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type _Record<K extends keyof any, T> = {
  [P in K]: T;
};

type _Exclude<T, U> = T extends U ? never : T;

type _Extract<T, U> = T extends U ? T : never;

type _NonNullable<T> = T extends null | undefined ? never : T;

type _ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
