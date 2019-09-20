# BLEted JS Library

BLEted is a small library that makes connecting and listening to a BLE peripheral easy.

## Example

```
bleted_observeNotifications(
    '4677062c-ad02-4034-9abf-98581772427c', // Service UUID
    'dc13b36a-3499-46b0-ac11-5ac0173c4cc5', // Characteristic UUID(s) to listen on
    function (event) { // Callback when characterisitc notifies
        var value = event.target.value.getUint8(0);
        console.log('value=' + value);
    }
).catch((error) => {
    console.log('error: ' + error);
});
```