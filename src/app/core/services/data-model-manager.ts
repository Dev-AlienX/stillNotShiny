import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import {
  IStoreChanges,
  IActionOptions,
  StoreAction,
  IstorePatch,
  segments,
} from './data-model.interface';
import _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class DataModelManager {
  private readonly dataModels: Map<string, any> = new Map<string, any>();
  private readonly dataSource: BehaviorSubject<IStoreChanges> = new BehaviorSubject<IStoreChanges>({
    store: undefined,
    patch: {
      storeId: '',
      firstChange: true,
    },
  } as IStoreChanges);

  private readonly storeChanges: IStoreChanges[] = [];
  public dataStream$: Observable<IStoreChanges> = this.dataSource.asObservable();

  // private scope = Scope
  //#region regesterDataModel
  public registerDataModel(
    dataModelId: string,
    dataModel: any,
    overwrite: boolean = false,
    isMutable: boolean = false,
  ): void {
    if (!dataModelId) {
      throw new Error('Dara Model Manager Error : invalid dataModelId!');
    }

    if (dataModel === undefined) {
      throw new Error('Dara Model Manager Error : invalid dataModel!');
    }

    if (this.dataModels.has(dataModelId) && !overwrite) {
      throw new Error(
        'Dara Model Manager Error : dataModelId already regestred! use new id or set overwrite true',
      );
    }

    this.dataModels.set(dataModelId, isMutable ? dataModel : _.cloneDeep(dataModel));

    this.notifyChanges({
      store: this.dataModels,
      patch: {
        patchId: this.generateUID(),
        storeId: dataModelId,
        firstChange: false,
        timeStamp: Date.now(),
        operation: StoreAction.register,
        innerAction: false,
      },
    });
  }
  //#endregion

  //#region reRegisterDataModel
  public reRegisterDataModel(
    dataModelId: string,
    dataModel: any,
    isMutable: boolean = false,
  ): void {
    if (!dataModelId) {
      throw new Error('Dara Model Manager Error : invalid dataModelId!');
    }

    if (dataModel === undefined) {
      throw new Error('Dara Model Manager Error : invalid dataModel!');
    }

    this.dataModels.set(dataModelId, isMutable ? dataModel : _.cloneDeep(dataModel));

    this.notifyChanges({
      store: this.dataModels,
      patch: {
        patchId: this.generateUID(),
        storeId: dataModelId,
        firstChange: false,
        timeStamp: Date.now(),
        operation: StoreAction.register,
        innerAction: false,
      },
    });
  }
  //#endregion

  //#region deregisterDataModel
  public deregisterDataModel(dataModelId: string): void {
    if (!dataModelId) {
      throw new Error('Dara Model Manager Error : invalid dataModelId!');
    }

    this.dataModels.delete(dataModelId);

    this.storeChanges
      .reduce(
        (m: number[], e: IStoreChanges, i: number) => (
          e.patch.storeId === dataModelId && m.push(i),
          m
        ),
        [],
      )
      .reverse()
      .forEach((i: any) => this.storeChanges.splice(i, 1));
  }
  //#endregion

  //#region has and hasIn
  public has(dataModelId: string): boolean {
    const resolveValue = this.dataModels.has(dataModelId);
    if (resolveValue) {
      return true;
    } else {
      return false;
    }
  }

  public hasIn(dataModelId: string, path: string): boolean {
    const resolveValue = this.dataModels.has(dataModelId);
    if (resolveValue) {
      if (this.dataModels.has(dataModelId)) {
        if (!path) {
          return false;
        }
        return _.has(this.dataModels.get(dataModelId), this.path(dataModelId, path.split('.')));
      }
    }
    return false;
  }
  //#endregion

  //#region getById and getIn
  public getById(dataModelId: string): any {
    const resolveValue = this.dataModels.get(dataModelId);
    if (resolveValue !== undefined) {
      return resolveValue;
    }
    return undefined;
  }

  public getIn(dataModelId: string, path: segments): any {
    const resolveValue = _.get(this.dataModels.get(dataModelId), this.path(dataModelId, path));
    if (resolveValue !== undefined) {
      return resolveValue;
    }
    return undefined;
  }
  //#endregion

  //#region setIn
  public setIn(
    dataModelId: string,
    path: segments,
    value: any,
    actionOptions: IActionOptions = {},
  ): void {
    const resolveValue = this.dataModels.get(dataModelId);
    if (resolveValue !== undefined) {
      const shouldMutate = this.shouldMutate(dataModelId, path, actionOptions.operation);
      if (shouldMutate === undefined) {
        return;
      }

      this.notifyChanges({
        store: this.dataModels.set(
          dataModelId,
          _.setWith(
            this.mutateRoot(dataModelId),
            this.path(dataModelId, path),
            value,
            this.setWithCustomize,
          ),
        ),
        patch: {
          patchId: this.generateUID(),
          storeId: dataModelId,
          firstChange: false,
          timeStamp: Date.now(),
          patchedPath: path.join('.'),
          patchedValue: shouldMutate,
          previousValue: this.getIn(dataModelId, path),
          operation: actionOptions.operation,
          innerAction: actionOptions.innerAction,
        },
      });
    }
  }
  //#endregion

  //#region delete
  public delete(
    storeId: string,
    path: segments,
    targetArray: any[],
    itemToDelete: any,
    actionOptions: IActionOptions = {},
  ): void {
    const filteredArray = targetArray.filter((item) => [itemToDelete].indexOf(item) === -1);
    const newPath = Object.assign([], path);
    newPath.pop();

    this.notifyChanges({
      store: this.dataModels.set(
        storeId,
        _.setWith(this.mutateRoot(storeId), this.path(storeId, path), filteredArray),
      ),
      patch: {
        patchId: this.generateUID(),
        storeId: storeId,
        firstChange: false,
        timeStamp: Date.now(),
        patchedPath: path && path.join('.'),
        patchedValue: itemToDelete,
        previousValue: this.getIn(storeId, path),
        operation: actionOptions.operation,
        innerAction: actionOptions.innerAction,
      },
    });
  }
  //#endregion

  public path(storeId: string, path: segments, invalidate: boolean = false): any[] {
    const resolvedPath: any[] = [];
    if (typeof path === 'string') {
      path = (path as string).split('.');
      _.forEach(path, (segment: string) =>
        resolvedPath.push(this.resolvePredicate(storeId, path, segment, invalidate)),
      );
    }
    return resolvedPath;
  }

  private resolvePredicate(
    storeId: string,
    path: segments,
    segment: string,
    invalidate: boolean = false,
  ): any {
    if (typeof segment === 'number' || !segment.includes(':') || segment.split(':').length !== 2) {
      return segment;
    }

    const [key, value] = segment.split(':');
    if (key || value) {
      const index = _.findIndex(
        _.get(this.dataModels.get(storeId), path),
        (item: any) => item[key] == value,
      );
      if (invalidate && index < 0) {
        throw new Error(
          `Dara Model Manager Error : invalid path segment ${segment} for storeId ${storeId}!`,
        );
      }

      return index;
    }
  }

  private shouldMutate(dataModelId: string, path: segments, newValue: any): any {
    const currentValue = this.getIn(dataModelId, path);
    if (typeof newValue === 'object' || Array.isArray(newValue)) {
      return currentValue;
    }
    return currentValue !== newValue ? newValue : undefined;
  }

  private mutateRoot(dataModelId: string): any {
    return _.clone(this.getById(dataModelId));
  }

  private setWithCustomize = ((value: any) => _.clone(value)).bind(this);

  private notifyChanges(changes: IStoreChanges): void {
    this.storeChanges.push(changes);
    if (!changes.patch.firstChange) {
      this.dataSource.next(changes);
    }
  }

  private generateUID(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
}
