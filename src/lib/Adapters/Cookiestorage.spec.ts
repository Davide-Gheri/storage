import { Storage } from '../../index';
import { Cookiestorage } from './Cookiestorage';

const string = 'value';
const obj = {test: '__test__', num: 123};

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

describe('Storage with Cookiestorage', function () {
    let sInstance;
    beforeEach(function() {
        sInstance = new Storage(new Cookiestorage());
    });

    it('Adapter shoud be Cookiestorage', function () {
        expect(sInstance.adapter instanceof Cookiestorage).toBeTruthy();
    });

    it('should set string value to cookie', function () {
        sInstance.set('__test__', string);
        const res = getCookie('__test__');
        expect(res).toEqual(string);
    });

    it('should set stringyfied object to cookie', function() {
        sInstance.set('__test__', obj);
        const res = getCookie('__test__');
        expect(typeof res).toBe('string');
    });

    it('should get string value from cookie', function () {
        document.cookie = '__test__=' + string;
        const res = sInstance.get('__test__');
        expect(res).toEqual(string);
    });

    it('should get parsed object from cookie', function () {
        document.cookie = '__test__=' + JSON.stringify(obj);
        const res = sInstance.get('__test__');
        expect(typeof res).toBe('object');
        expect(res).toEqual(obj);
    });

    it('should delete a value from cookie', function () {
        document.cookie = '__test__=' + string;
        const res = sInstance.delete('__test__');
        expect(res).toBeTruthy();
        expect(getCookie('__test__')).toBeNull();
    });

    it('should clear the cookie', function () {
        document.cookie = '__test__=' + string;
        document.cookie = '__test2__=' + string;
        sInstance.clear();
        expect(getCookie('__test__')).toBeNull();
        expect(getCookie('__test2__')).toBeNull();
    });
});