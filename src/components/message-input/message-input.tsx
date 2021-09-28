import { Dispatch, SetStateAction, useState } from "react";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap";
import { Message } from "../../interface/message.interface";
import './message-input.css';

function MessageInput(props: {sendMessage: Dispatch<SetStateAction<Array<Message>>>}) {
    const [message, setMessage] = useState('');

    const enterMessage = (message: string) => {
        props.sendMessage((prev: Array<Message>) => {
            return [...prev, {origin: 'user', message}];
        });
        setMessage('');
    }
    
    return (
        <div id='message-input'>
            <Container>
                <InputGroup>
                    <FormControl
                        placeholder="type something.."
                        aria-label="type something.."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' ? enterMessage(message) : null}
                    />
                    <Button onClick={()=> enterMessage(message)} variant="outline-secondary"  id="button-addon2">
                        Send
                    </Button>
                </InputGroup>
            </Container>
        </div>
    );
}

export default MessageInput;