# Storage

[![Build Status](https://travis-ci.org/Davide-Gheri/storage.svg?branch=master)](https://travis-ci.org/Davide-Gheri/storage)
[![Coverage Status](https://coveralls.io/repos/github/Davide-Gheri/storage/badge.svg)](https://coveralls.io/github/Davide-Gheri/storage)
[![npm version](https://badge.fury.io/js/%40davidegheri%2Fstorage.svg)](https://badge.fury.io/js/%40davidegheri%2Fstorage)
[![GitHub version](https://badge.fury.io/gh/Davide-Gheri%2Fstorage.svg)](https://badge.fury.io/gh/Davide-Gheri%2Fstorage) [![Greenkeeper badge](https://badges.greenkeeper.io/Davide-Gheri/storage.svg)](https://greenkeeper.io/)

### Small browser storage API library

#### Usage

```javascript
    var storage = new Storage('localstorage');
    storage.set('key', 'hello world'); // true
    storage.get('key') // hello world
```

Available adapters:
 - localstorage : Use the window.localstorage
 - sessionstorage : Use the window.sessionstorage
 - cookie : Use the document.cookie string


##### Methods

__set(key, value, options? (cookie only)): boolean__

_set the given value in the storage by the given key, options: for cookie storage you can pass storing options that overwrites the defaults_

__get(key, default?): any__

_get the value from the storage by the given key, optional default value is returned if nothing is found_

__delete(key): boolean__

_remove the value from the storage by the given key_

__clear(): void__

_remove all values from the storage_