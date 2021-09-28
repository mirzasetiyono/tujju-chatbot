import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import "./header.css";
import { Message } from "../../interface/message.interface";
import { downloadChat } from "../../core/chat-download.core";

function Header(props: { messages: Array<Message> }) {

  const clickDownload = () => {
    const chat = props.messages;
    downloadChat(chat);
  }

  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>Tujju Media Bot Messaging</Navbar.Brand>
        <Button onClick={() => {clickDownload()}} id="download-button" variant="secondary" size="lg">
          Download Chat History
        </Button>
      </Container>
    </Navbar>
  )
}

export default Header;