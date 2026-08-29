
export const webSocketService = (websocket) => {
    const listeners = [];
    
    const sendMessage = (user,message, chat) => {
        if (websocket.readyState === WebSocket.OPEN) {
            websocket.send(JSON.stringify({type: 'message', data: {message:message, chat:chat}, user:user}));
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

    const removeListeners = () => {
        while (listeners.length!==0){
            listeners.pop();
        }
    }

    websocket.onmessage = (event) => {
        const parsedEvent = JSON.parse(event.data);
        const listener = listeners.find((listener) => listener.name === parsedEvent.type)
        listener.function(parsedEvent)
    }

    return {
        sendMessage,
        sendChatRequest,
        addListener,
        removeListeners
    };
}