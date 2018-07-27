import { AdapterInterface } from '../AdapterInterface';
import { decode, tryParse } from '../utils';

interface CookieOptions {
    [key: string]: any
}

export class Cookiestorage implements AdapterInterface {
    private defaults = {
        path: '/'
    };

    private setAttributes(options?: CookieOptions): CookieOptions {
        const attributes = Object.assign(this.defaults, options);
        if (typeof attributes.expires === 'number') {
            attributes.expires = new Date(new Date().getTime() * 1 + attributes.expires * 864e+5);
        }
        attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';
        return attributes;
    }

    get(key: string, def: any = null): any {
        let jar = {};
        const cookies = document.cookie ? document.cookie.split('; ') : [];
        let i = 0;
        for (; i < cookies.length; i++) {
            const parts = cookies[i].split('=');
            let cookie = parts.slice(1).join('=');

            if (cookie.charAt(0) === '"') {
                cookie = cookie.slice(1, -1);
            }

            try {
                const name = decode(parts[0]);
                cookie = decode(cookie);
                cookie = tryParse(cookie);

                jar[name] = cookie;

                if (key === name) {
                    break;
                }
            } catch (e) {}
        }

        return key ? jar[key] || def : jar || def;
    }

    public set(key: string, value: any, options?: CookieOptions): boolean {
        const attributes = this.setAttributes(options);
        try {
            const result = JSON.stringify(value);
            if (/^[\{\[]/.test(result)) {
                value = result;
            }
        } catch (e) {}

        value = encodeURIComponent(String(value))
                .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

        key = encodeURIComponent(String(key))
            .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
            .replace(/[\(\)]/g, escape);
        let stringifiedAttributes = '';
        for (let attributeName in attributes) {
            if (!attributes[attributeName]) {
                continue;
            }
            stringifiedAttributes += '; ' + attributeName;
            if (attributes[attributeName] === true) {
                continue;
            }
            stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
        }

        return Boolean(document.cookie = key + '=' + value + stringifiedAttributes);
    }

    public delete(key: string): boolean {
        return this.set(key, '', {expires: -1});
    }

    public clear(): void {
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    }
}