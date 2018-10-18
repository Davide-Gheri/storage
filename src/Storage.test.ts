import { Localstorage, Storage } from './index';

describe('Storage initialization', () => {
  it('should use a default adapter is setAdapter is called with a string', () => {
    const sInstance = new Storage('localstorage');
    expect(sInstance['adapter'] instanceof Localstorage).toBe(true);
  });

  it('should throw an error if the passed adaper is not supported', () => {
    expect(() => new Storage('testStorage')).toThrow('Adapter testStorage not supported');
  });

  it('get should use the passed adapter instead of the previously setted one', () => {
    localStorage.setItem('test', 'localValue');
    sessionStorage.setItem('test', 'sessionValue');
    const sInstance = new Storage('localstorage');
    const res = sInstance.get('test', null, {adapter: 'sessionstorage'});
    expect(res).toBe('sessionValue');
  });
});
