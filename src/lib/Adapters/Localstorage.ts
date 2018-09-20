import { AdapterInterface } from '../AdapterInterface';
import { tryParse } from '../utils';

export class Localstorage implements AdapterInterface{
  get(key: string, def: any = null): any {
    return tryParse(localStorage.getItem(key)) || def;
  }

  set(key: string, value: any): boolean {
    try {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  delete(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  }

  clear(): void {
    localStorage.clear();
  }
}
