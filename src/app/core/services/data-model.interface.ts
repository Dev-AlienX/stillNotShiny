export interface IStoreChanges {
  store: any | undefined;
  patch: IstorePatch;
}

export interface IstorePatch {
  patchId: string;
  storeId: string;
  firstChange?: boolean;
  patchedPath?: string;
  patchedValue?: any;
  previousValue?: any;
  timeStamp: number;
  operation?: StoreAction;
  innerAction?: boolean;
}

export enum StoreAction {
  add = 'add',
  extend = 'extend',
  edit = 'edit',
  delete = 'delete',
  register = 'register',
}

export interface IActionOptions {
  innerAction?: boolean;
  operation?: StoreAction;
}

export type segments = string[];