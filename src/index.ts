import {  AdapterInterface } from './lib/AdapterInterface';
import { Cookiestorage, Localstorage, Sessionstorage } from './lib/Adapters';
import { ObjectStorage } from './lib/Adapters/ObjectStorage';

interface StorageOptions {
    adapter: string
}

/**
 * @ngdoc object
 * @name Storage
 *
 * @description
 * Storage is the library to save and get data in different ways.
 *
 */
export class Storage {
    private readonly defaults = {
        localstorage: Localstorage,
        sessionstorage: Sessionstorage,
        cookie: Cookiestorage,
        object: ObjectStorage
    };

    private adapter: AdapterInterface = new Localstorage();

    constructor(adapter: AdapterInterface | string) {
        this.setAdapter(adapter);
    }

    public setAdapter(adapter: AdapterInterface | string) {
        if (typeof adapter === 'string') {
            this.adapter = this.useAdapter(adapter as string);
        } else {
            this.adapter = adapter as AdapterInterface;
        }
        new Error(`Adapter ${adapter} not supported`)
    }

    private useAdapter(adapter: string) {
        if (Object.keys(this.defaults).indexOf(adapter) >= 0) {
            const ad = this.defaults[adapter as string];
            return new ad();
        }
        new Error(`Adapter ${adapter} not supported`)
    }

    private resolveAdapter(options?: StorageOptions) {
        return options ? this.useAdapter(options.adapter) || this.adapter : this.adapter;
    }

    public get(key: string, def?: any, options?: StorageOptions) {
        return this.resolveAdapter(options).get(key, def);
    }

    public set(key: string, value: any, options?: StorageOptions) {
        return this.resolveAdapter(options).set(key, value);
    }

    public delete(key: string, options?: StorageOptions) {
        return this.resolveAdapter(options).delete(key);
    }

    public clear(options?: StorageOptions) {
        return this.resolveAdapter(options).clear()
    }
}