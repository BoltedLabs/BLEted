/**
 * Method used to listen on a BluetoothRemoteGATTCharacteristic value.
 * 
 * @param {string} serviceUuid - The primary service UUID to search for
 * @param {string|!Array<string>} characteristicUuid - The characteristic(s) to listen for events on
 * @param {function} notificationCallback - Fired when a notificaiton is observed. An Event (https://developer.mozilla.org/en-US/docs/Web/API/Event) parameter is passed.
 */
async function bleted_observeNotifications(serviceUuid, characteristicUuid, notificationCallback) {
    if (navigator.bluetooth) {
        var services = [],
            characteristics = [];

        if (typeof serviceUuid === 'string') {
            services = [serviceUuid];
        } else {
            throw new TypeError('The serviceUuid parameter must be of type string.');
        }

        if (typeof characteristicUuid === 'string') {
            characteristics = [characteristicUuid];
        } else if (Array.isArray(characteristicUuid)) {
            characteristics = characteristicUuid;
        } else {
            throw new TypeError('The characteristicUuid parameter must be of type string or array.');
        }

        const device = await navigator.bluetooth.requestDevice({
            filters: [{
                services: services
            }]
        });

        const server = await device.gatt.connect();
        const service = await server.getPrimaryService(serviceUuid);

        for (i in characteristics) {
            const characteristic = await service.getCharacteristic(characteristics[i]);
            await characteristic.startNotifications();
            characteristic.addEventListener('characteristicvaluechanged', notificationCallback);
        }
    } else {
        throw new NotSupportedError('No bluetooth support');
    }
}