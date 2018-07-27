import { AdapterInterface } from '../AdapterInterface';

export class ObjectStorage implements AdapterInterface {
    private state: {[key: string]: any} = {};

    get(key?: string, def?: any): any {
        return key ? this.state[key] || def : this.state || def;
    }

    set(key: string, value: any): boolean {
        try {
            this.state[key] = value;
            return true;
        } catch (e) {
            return false
        }
    }

    delete(key: string): boolean {
        try {
            delete this.state[key];
            return true
        } catch (e) {
            return false
        }
    }

    clear(): void {
        this.state = {};
    }
}