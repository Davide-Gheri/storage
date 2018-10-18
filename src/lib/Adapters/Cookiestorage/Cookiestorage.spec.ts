import { Storage } from '../../../index';
import { Cookiestorage } from './index';

const string = 'value';
const obj = {test: '__test__', num: 123};

function getCookie(cname) {
  let name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

describe('Storage with Cookiestorage', () => {
  let sInstance, cookie;
  beforeEach(function() {
    cookie = new Cookiestorage();
    sInstance = new Storage(cookie);
  });

  it('custom path on constructor', () => {
    const customCookie = new Cookiestorage({path: '/example'});
    expect(customCookie['defaults']).toEqual({path: '/example'});
  });

  it('Adapter should be Cookiestorage', () => {
    expect(sInstance.adapter instanceof Cookiestorage).toBeTruthy();
  });

  it('should have a default path if no options are passed to the constructor', () => {
    expect(cookie['defaults']).toEqual({path: '/'});
  });

  it('should set string value to cookie', () => {
    sInstance.set('__test__', string);
    const res = getCookie('__test__');
    expect(res).toEqual(string);
  });

  it('should set stringyfied object to cookie', () => {
    sInstance.set('__test__', obj);
    const res = getCookie('__test__');
    expect(typeof res).toBe('string');
  });

  it('should get string value from cookie', () => {
    document.cookie = '__test__=' + string;
    const res = sInstance.get('__test__');
    expect(res).toEqual(string);
  });

  it('should get default if value not found', () => {
    const res = sInstance.get('notFound', 'default');
    expect(res).toBe('default');
  });

  it('should get parsed object from cookie', () => {
    document.cookie = '__test__=' + JSON.stringify(obj);
    const res = sInstance.get('__test__');
    expect(typeof res).toBe('object');
    expect(res).toEqual(obj);
  });

  it('should delete a value from cookie', () => {
    document.cookie = '__test__=' + string;
    const res = sInstance.delete('__test__');
    expect(res).toBeTruthy();
    expect(getCookie('__test__')).toBeNull();
  });

  it('should clear the cookie', () => {
    document.cookie = '__test__=' + string;
    document.cookie = '__test2__=' + string;
    sInstance.clear();
    expect(getCookie('__test__')).toBeNull();
    expect(getCookie('__test2__')).toBeNull();
  });
});
