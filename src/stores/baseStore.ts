import { BehaviorSubject } from "rxjs";

export class BaseStore<T> {
  private modelSubject: BehaviorSubject<T | any>;

  constructor(initialModel: T | any) {
    this.modelSubject = new BehaviorSubject<T | any>(initialModel);
  }

  getModel(): T | any {
    return this.modelSubject.getValue();
  }

  setModel(newModel: T): void {
    this.modelSubject.next(newModel);
  }

  updateModel(update: Partial<T>): void {
    const currentModel = this.modelSubject.getValue();
    if (currentModel) {
      const updatedModel = { ...currentModel, ...update };
      this.modelSubject.next(updatedModel);
    }
  }
}
