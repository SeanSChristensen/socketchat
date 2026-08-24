
export const webSocketService = (websocket) => {
    const listeners = [];
    
    const sendMessage = (user,message) => {
        if (websocket.readyState === WebSocket.OPEN) {
            websocket.send(JSON.stringify({type: 'message', data: message, user:user}));
        }
    }

    const sendChatRequest = (selectedChat) => {
        if (websocket.readyState === WebSocket.OPEN) {
            websocket.send(JSON.stringify({type: 'chat', data: selectedChat}));
        }
    }

    const addListener = (name,listener) => {
        listeners.push({name: name, function: listener});
    }

    websocket.onmessage = (event) => {
        const parsedEvent = JSON.parse(event.data);
        const listener = listeners.find((listener) => listener.name === parsedEvent.type)
        listener.function(parsedEvent)
    }

    return {
        sendMessage,
        sendChatRequest,
        addListener
    };
}