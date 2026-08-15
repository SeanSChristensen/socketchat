export function ChatDisplay({messagesProp}){
    return (
        <div className="container">{
            messagesProp.map((message, index) => (
                <p key={index} className={message.user === 'me' ? 'myMessage' : 'otherMessage'}>
                    {message.text}
                </p>
            ))
        }</div>)
}