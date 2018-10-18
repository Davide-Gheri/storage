import { Storage } from '../../../index';
import { Objectstorage } from './index';

const string = 'value';
const obj = {test: '__test__', num: 123};

describe('Storage with Objectstorage', function() {
  let sInstance;
  beforeEach(function() {
    sInstance = new Storage(new Objectstorage());
  });

  it('Adapter shoud be ObjectStorage', function() {
    expect(sInstance.adapter instanceof Objectstorage).toBeTruthy();
  });

  it('should set and get a value to a javascript Object', function() {
    sInstance.set('__test__', string);
    const res = sInstance.get('__test__', string);
    expect(res).toEqual(string);
  });

  it('if no key provided, it should get the entire Object storage', function() {
    sInstance.set('key1', string);
    sInstance.set('key2', obj);
    const res = sInstance.get();
    expect(res).toEqual({key1: string, key2: obj});
  });

  it('should delete a value from the javascript Object', function() {
    sInstance.set('__test__', string);
    const res = sInstance.delete('__test__');
    expect(res).toBeTruthy();
    expect(sInstance.get('__test__')).toBeNull();
  });

  it('should clear the javascript Object', function() {
    sInstance.set('__test__', string);
    sInstance.set('__test2__', string);
    sInstance.clear();
    expect(sInstance.get('__test__')).toBeNull();
    expect(sInstance.get('__test2__')).toBeNull();
  });
});
