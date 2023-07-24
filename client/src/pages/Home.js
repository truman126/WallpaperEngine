import { FileSelector, Options} from "../components";
import styled from "styled-components";


const Container = styled.div`
    display:flex;

`;

const Home = () => {
  return (
       <Container>
        <FileSelector />
        <Options />
      </Container>
  );
};

export default Home;
