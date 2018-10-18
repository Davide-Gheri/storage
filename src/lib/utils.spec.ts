import { decode, tryParse } from './utils';

const obj = {key1: 111, key2: 'hello world'};

describe('decode', function() {
  it('should decode and encoded string', function() {
    const encoded = encodeURIComponent(String('hello world')).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
    const decoded = decode(encoded);
    expect(decoded).toEqual('hello world');
  });

  it('should decode an encoded object', function() {
    const encoded = encodeURIComponent(String(JSON.stringify(obj))).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
    const decoded = decode(encoded);
    expect(decoded).toEqual(JSON.stringify(obj));
  });
});

describe('tryParse', function() {
  it('should parse a stringyfied object', function() {
    const stringyfied = JSON.stringify(obj);
    const res = tryParse(stringyfied);
    expect(typeof res).toEqual('object');
    expect(res).toEqual(obj);
  });

  it('should not parse a string', function() {
    const res = tryParse('hello world');
    expect(typeof res).toEqual('string');
    expect(res).toEqual('hello world');
  });
});
