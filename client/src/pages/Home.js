import { FileSelector, Options } from "../components";
import { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="loading">
          <section className="loader"></section>
        </div>
      )}
      <MDBContainer fluid style={{ visibility: isLoading ? "hidden" : "" }}>
        
        <MDBRow>
          <MDBCol className="sm-6">
 <FileSelector className=" mx-5" setLoading={setIsLoading} />
          </MDBCol>
          <MDBCol className="sm-6">
            <Options className="mx-5 w-100" setLoading={setIsLoading} />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Home;
