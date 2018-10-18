import { Cookiestorage, Localstorage, Sessionstorage, Objectstorage, AdapterInterface } from './lib/Adapters';

export * from './lib/utils';
export * from './lib/Adapters';

export interface StorageOptions {
  adapter: string;
}

export interface StorageDefaults {
  localstorage: typeof Localstorage;
  sessionstorage: typeof Sessionstorage;
  cookie: typeof Cookiestorage;
  object: typeof Objectstorage;
}

export class Storage {
  private readonly defaults: StorageDefaults = {
    localstorage: Localstorage,
    sessionstorage: Sessionstorage,
    cookie: Cookiestorage,
    object: Objectstorage,
  };

  private adapter: AdapterInterface = new Localstorage();

  constructor(adapter: AdapterInterface | string) {
    this.setAdapter(adapter);
  }

  public setAdapter(adapter: AdapterInterface | string): void {
    if (typeof adapter === 'string') {
      this.adapter = this.useAdapter(adapter as string);
    } else {
      this.adapter = adapter as AdapterInterface;
    }
    new Error(`Adapter ${adapter} not supported`);
  }

  private useAdapter(adapter: string): AdapterInterface {
    if (Object.keys(this.defaults).indexOf(adapter) >= 0) {
      const ad = this.defaults[adapter as string];
      return new ad();
    }
    throw new Error(`Adapter ${adapter} not supported`);
  }

  private resolveAdapter(options?: StorageOptions): AdapterInterface {
    return options ? this.useAdapter(options.adapter) : this.adapter;
  }

  public get(key: string, def?: any, options?: StorageOptions): any {
    return this.resolveAdapter(options).get(key, def);
  }

  public set(key: string, value: any, options?: StorageOptions): boolean {
    return this.resolveAdapter(options).set(key, value);
  }

  public delete(key: string, options?: StorageOptions): boolean {
    return this.resolveAdapter(options).delete(key);
  }

  public clear(options?: StorageOptions): void {
    return this.resolveAdapter(options).clear();
  }
}
