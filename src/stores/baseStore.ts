import { BehaviorSubject } from 'rxjs';

export class BaseStore<T> {
  public model: BehaviorSubject<T>;

  constructor(initialModel: T) {
    this.model = new BehaviorSubject<T>(initialModel);
  }

  public getModel(): T {
    return this.model.getValue();
  }

  public setModel(newModel: T): void {
    this.model.next(newModel);
  }

  public updateModel(callback: Partial<T> | ((model: T) => Partial<T>)): void {
    const currentModel = this.model.getValue();
    if (currentModel) {
      const updatedModel = typeof callback === 'function' ? callback(currentModel) : callback;
      this.model.next({ ...currentModel, ...updatedModel } as T);
    }
  }
}
