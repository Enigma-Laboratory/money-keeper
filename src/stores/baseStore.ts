import { BehaviorSubject } from "rxjs";

export class BaseStore<T = any> {
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

  public updateModel(value: Partial<T>): void {
    const currentModel = this.model.getValue();
    if (currentModel) {
      const updatedModel = { ...currentModel, ...value };
      this.model.next(updatedModel);
    }
  }
}
