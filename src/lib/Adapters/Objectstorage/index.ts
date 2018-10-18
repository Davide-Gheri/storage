import { AdapterInterface } from '../AdapterInterface';

export interface ObjectState {
  [key: string]: any;
}

export class Objectstorage implements AdapterInterface {
  private state: ObjectState = {};

  constructor(initialState: ObjectState = {}) {
    this.state = initialState;
  }

  get(key: string, def: any = null): any {
    return key ? this.state[key] || def : this.state || def;
  }

  set(key: string, value: any): boolean {
    try {
      this.state[key] = value;
      return true;
    } catch (e) {
      return false;
    }
  }

  delete(key: string): boolean {
    try {
      delete this.state[key];
      return true;
    } catch (e) {
      return false;
    }
  }

  clear(): void {
    this.state = {};
  }
}
