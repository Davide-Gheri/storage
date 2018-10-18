import { Storage } from '../../../index';
import { Localstorage } from './index';

const string = 'value';
const obj = {test: '__test__', num: 123};

describe('Storage with Localstorage', function() {
  let sInstance;
  beforeEach(function() {
    sInstance = new Storage(new Localstorage());
  });

  it('Adapter shoud be Localstorage', function() {
    expect(sInstance.adapter instanceof Localstorage).toBeTruthy();
  });

  it('should set string value to localstorage', function() {
    sInstance.set('__test__', string);
    const res = window.localStorage.getItem('__test__');
    expect(res).toEqual(string);
  });

  it('should set stringyfied object to localstorage', function() {
    sInstance.set('__test__', obj);
    const res = window.localStorage.getItem('__test__');
    expect(typeof res).toBe('string');
  });

  it('should get string value from localstorage', function() {
    window.localStorage.setItem('__test__', string);
    const res = sInstance.get('__test__');
    expect(res).toEqual(string);
  });

  it('should should get parsed object from localstorage', function() {
    window.localStorage.setItem('__test__', JSON.stringify(obj));
    const res = sInstance.get('__test__');
    expect(typeof res).toBe('object');
    expect(res).toEqual(obj);
  });

  it('should delete a value from localstorage', function() {
    window.localStorage.setItem('__test__', string);
    const res = sInstance.delete('__test__');
    expect(res).toBeTruthy();
    expect(window.localStorage.getItem('__test__')).toBeNull();
  });

  it('should clear the localstorage', function() {
    window.localStorage.setItem('__test__', string);
    window.localStorage.setItem('__test2__', string);
    sInstance.clear();
    expect(window.localStorage.getItem('__test__')).toBeNull();
    expect(window.localStorage.getItem('__test2__')).toBeNull();
  });
});
