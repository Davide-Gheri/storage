import { Storage } from '../../../index';
import { Sessionstorage } from './index';

const string = 'value';
const obj = {test: '__test__', num: 123};

describe('Storage with Sessionstorage', function () {
    let sInstance;
    beforeEach(function() {
        sInstance = new Storage(new Sessionstorage());
    });

    it('Adapter shoud be Localstorage', function () {
        expect(sInstance.adapter instanceof Sessionstorage).toBeTruthy();
    });

    it('should set string value to sessionstorage', function () {
        sInstance.set('__test__', string);
        const res = window.sessionStorage.getItem('__test__');
        expect(res).toEqual(string);
    });

    it('should set stringyfied object to sessionstorage', function() {
        sInstance.set('__test__', obj);
        const res = window.sessionStorage.getItem('__test__');
        expect(typeof res).toBe('string');
    });

    it('should get string value from sessionstorage', function () {
        window.sessionStorage.setItem('__test__', string);
        const res = sInstance.get('__test__');
        expect(res).toEqual(string);
    });

    it('should should get parsed object from sessionstorage', function () {
        window.sessionStorage.setItem('__test__', JSON.stringify(obj));
        const res = sInstance.get('__test__');
        expect(typeof res).toBe('object');
        expect(res).toEqual(obj);
    });

    it('should delete a value from sessionstorage', function () {
        window.sessionStorage.setItem('__test__', string);
        const res = sInstance.delete('__test__');
        expect(res).toBeTruthy();
        expect(window.sessionStorage.getItem('__test__')).toBeNull();
    });

    it('should clear the sessionstorage', function () {
        window.sessionStorage.setItem('__test__', string);
        window.sessionStorage.setItem('__test2__', string);
        sInstance.clear();
        expect(window.sessionStorage.getItem('__test__')).toBeNull();
        expect(window.sessionStorage.getItem('__test2__')).toBeNull();
    });
});