import { Alert, Container } from "react-bootstrap";
import { Message } from "../../interface/message.interface";
import './message-container.css'

function MessageContainer(props: { messages: Array<Message> }) {
    return (
        <div id='message-container'>
            <Container>
                <div>
                    {
                        props.messages.map((prop, i) => {
                            const isBot = prop.origin === 'bot';
                            return <Alert
                                variant={isBot ? 'info' : 'dark'}
                                key={i}
                                className={isBot ? 'bot' : 'user'}>{prop.message}</Alert>
                        })
                    }
                </div>
            </Container>
        </div>
    )
}

export default MessageContainer;