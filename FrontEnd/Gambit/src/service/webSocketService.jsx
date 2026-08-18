
export const webSocketService = (websocket) => {
    const listeners = [];
    
    const sendMessage = (message) => {
        if (websocket.readyState === WebSocket.OPEN) {
            websocket.send(message);
            listeners.forEach((listener) => listener('me',message));
        }
    }

    const addListener = (listener) => {
        listeners.push(listener);
    }

    websocket.onmessage = (event) => {
        listeners.forEach((listener) => listener('server', event.data));
    }

    return {
        sendMessage,
        addListener
    };
}