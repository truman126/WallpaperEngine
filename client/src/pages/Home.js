import { FileSelector, Options } from "../components";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const Home = () => {
  return (
    <div className="home">
      <FileSelector />
      <Options />
    </div>
  );
};

export default Home;
