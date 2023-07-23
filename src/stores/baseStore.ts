import { BehaviorSubject, Observable } from "rxjs";

export class BaseStore<T = any> {
  private modelSubject: BehaviorSubject<T>;

  constructor(initialModel: T) {
    this.modelSubject = new BehaviorSubject<T>(initialModel);
  }

  getModelObservable(): Observable<T> {
    return this.modelSubject.asObservable();
  }

  getModel(): T {
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
