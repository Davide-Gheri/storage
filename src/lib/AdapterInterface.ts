
export interface AdapterInterface {
  get(key: string, def?: any): any;

  set(key: string, value: any): boolean;

  delete(key: string): boolean;

  clear(): void;
}
