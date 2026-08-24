export function ChatDisplay({messagesProp,currentUser}){
    console.log({messagesProp,currentUser})
    return (
        <div className="container">{
            messagesProp.map((message, index) => (
                <p key={index} className={message.user === currentUser ? 'myMessage' : 'otherMessage'}>
                    {message.text}
                </p>
            ))
        }</div>)
}