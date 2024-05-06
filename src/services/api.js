export default class Api {
    constructor(timeout = 5000, maxAttempts = 5) {
        this.timeout = timeout;
        this.maxAttempts = maxAttempts;
        this.subscription = {};
        this._baseUrl = 'wss://stream.binance.com:9443/ws/';
    }

    subscribe(cb, endpoint) {
        let ws;
        try {
            const path = this._baseUrl + endpoint;
            if (this.subscription[path]) {
                return this.subscription[path];
            }
            ws = this._openWebSocket(path, cb);
            this.subscription[path] = ws;
        } catch (ex) {
            console.error("Error: ", ex);
        }
        return ws;
    }

    _openWebSocket(path, cb) {
        const ws = new WebSocket(path);
        ws.onopen = () => console.log('Connected to', path);
        ws.onmessage = (e) => cb(JSON.parse(e.data));
        ws.onerror = (e) => console.error('Error:', e);
        ws.onclose = (e) => {
            console.log('Closed!', e);
            this._reconnect(path, cb);
        };
        return ws;
    }

    _reconnect(path, cb) {
        if (!this.subscription[path]) return;
        setTimeout(() => {
            console.log('Reconnecting to', path);
            this.subscription[path] = this._openWebSocket(path, cb);
        }, this.timeout);
    }

    unsubscribe(endpoint) {
        const ws = this.subscription[endpoint];
        if (ws) {
            ws.close(1000, '');
            delete this.subscription[endpoint];
        }
    }

    unsubscribeAll() {
        for (const endpoint in this.subscription) {
            this.unsubscribe(endpoint);
        }
    }
}