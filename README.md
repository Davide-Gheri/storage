# Storage

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
 - objectstorage : Use a js Object


##### Methods

_set(key, value, options? (cookie only)): boolean_

_get(key, default): any_

_delete(key): boolean_

_clear(): void_