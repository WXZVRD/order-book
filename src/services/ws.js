export default function WebSocketWrapper(url, options) {
    options = options || {};

    let ws;
    let retryCount = 0;
    const maxRetries = options.maxRetries || Infinity;
    const retryInterval = options.retryInterval || 1000;

    const openHandler = options.onopen || (() => {});
    const messageHandler = options.onmessage || (() => {});
    const errorHandler = options.onerror || (() => {});
    const closeHandler = options.onclose || (() => {});

    const openWebSocket = () => {
        ws = new WebSocket(url, options.protocols);

        ws.onopen = (event) => {
            openHandler(event);
            retryCount = 0;
        };

        ws.onmessage = (event) => {
            messageHandler(event);
        };

        ws.onerror = (event) => {
            errorHandler(event);
            reconnect();
        };

        ws.onclose = (event) => {
            closeHandler(event);
            reconnect();
        };
    };

    const reconnect = () => {
        if (retryCount < maxRetries) {
            setTimeout(openWebSocket, retryInterval);
            retryCount++;
        }
    };

    openWebSocket();

    return ws;
}