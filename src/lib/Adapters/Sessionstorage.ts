import { AdapterInterface } from '../AdapterInterface';
import { tryParse } from '../utils';

export class Sessionstorage implements AdapterInterface{
    get(key: string, def: any = null): any {
        return tryParse(sessionStorage.getItem(key)) || def;
    }

    set(key: string, value: any): boolean {
        try {
            sessionStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    }

    delete(key: string): boolean {
        try {
            sessionStorage.removeItem(key);
            return true;
        } catch (e) {
            return false;
        }
    }

    clear(): void {
        sessionStorage.clear();
    }
}