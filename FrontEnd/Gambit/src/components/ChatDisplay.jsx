export function ChatDisplay({messagesProp,currentUser}){
    const filteredMessages = messagesProp.filter((message) => message.user !== currentUser)
    return (
        <div className="container">{
            filteredMessages.map((message, index) => (
                <p key={index} className={message.user === 'me' ? 'myMessage' : 'otherMessage'}>
                    {message.text}
                </p>
            ))
        }</div>)
}