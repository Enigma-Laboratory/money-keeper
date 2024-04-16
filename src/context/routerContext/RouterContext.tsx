import React, { createContext, PropsWithChildren } from 'react';

export type Action = 'create' | 'edit' | 'list' | 'show' | 'clone';

export type GoConfig = {
  to?: string;
  query?: Record<string, unknown>;
  hash?: string;
  options?: {
    keepQuery?: boolean;
    keepHash?: boolean;
  };
  type?: 'push' | 'replace' | 'path';
};

export type CrudSort = {
  field: string;
  order: 'asc' | 'desc';
};

export type CrudOperators =
  | 'eq'
  | 'ne'
  | 'lt'
  | 'gt'
  | 'lte'
  | 'gte'
  | 'in'
  | 'nin'
  | 'contains'
  | 'ncontains'
  | 'containss'
  | 'ncontainss'
  | 'between'
  | 'nbetween'
  | 'null'
  | 'nnull'
  | 'startswith'
  | 'nstartswith'
  | 'startswiths'
  | 'nstartswiths'
  | 'endswith'
  | 'nendswith'
  | 'endswiths'
  | 'nendswiths'
  | 'or'
  | 'and';

export type LogicalFilter = {
  field: string;
  operator: Exclude<CrudOperators, 'or' | 'and'>;
  value: any;
};

export type ConditionalFilter = {
  key?: string;
  operator: Extract<CrudOperators, 'or' | 'and'>;
  value: (LogicalFilter | ConditionalFilter)[];
};

export type CrudFilter = LogicalFilter | ConditionalFilter;

export type ParsedParams<TParams extends Record<string, any> = Record<string, any>> = {
  filters?: CrudFilter[];
  sorters?: CrudSort[];
  current?: number;
  pageSize?: number;
} & TParams;

export type ParseResponse<TParams extends Record<string, any> = Record<string, any>> = {
  params?: ParsedParams<TParams>;
  resource?: any;
  id?: string | number;
  action?: Action;
  pathname?: string;
};

export type GoFunction = (config: GoConfig) => void | string;

export type BackFunction = () => void;

export type ParseFunction<TParams extends Record<string, any> = Record<string, any>> = () => ParseResponse<TParams>;

export type RouterProvider = {
  go?: () => GoFunction;
  back?: () => BackFunction;
  parse?: () => ParseFunction;
  Link?: React.ComponentType<React.PropsWithChildren<{ to: string; [prop: string]: any }>>;
};

const defaultRouterProvider = {};

export const RouterContext = createContext<RouterProvider>(defaultRouterProvider);

export const RouterContextProvider: React.FC<PropsWithChildren<{ router?: RouterProvider }>> = ({
  children,
  router,
}) => {
  return <RouterContext.Provider value={router ?? defaultRouterProvider}>{children}</RouterContext.Provider>;
};
