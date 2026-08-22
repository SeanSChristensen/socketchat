
export const webSocketService = (websocket) => {
    const listeners = [];
    
    const sendMessage = (user,message) => {
        if (websocket.readyState === WebSocket.OPEN) {
            websocket.send(JSON.stringify({type: 'message', data: message, user:user}));
            listeners.forEach((listener) => {                
                if(listener.name === 'message'){
                    listener.function('me',message)
                }}
        );
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


    //Todo, make the listners flow correct. For not it loops over each listener and check the type of the message for each
    websocket.onmessage = (event) => {
        const parsedEvent = JSON.parse(event.data);

        listeners.forEach((listener) => {        
                if(parsedEvent.type === 'message'){
                    if(listener.name === 'message'){
                        listener.function(parsedEvent.user, parsedEvent.data)
                        return;
                    }
                }
                if(parsedEvent.type === 'chat'){
                    if(listener.name === 'chat'){
                        listener.function(parsedEvent.data)
                        return;
                    }
            }
        });
    }

    return {
        sendMessage,
        sendChatRequest,
        addListener
    };
}