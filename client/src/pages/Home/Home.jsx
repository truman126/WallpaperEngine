import FileSelector from "./FileSelector";
import File from "./File";
import Options from "./Options";
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
      <div className="flex w-full" style={{ visibility: isLoading ? "hidden" : "" }}>

        
            <div className="card bg-base-300 rounded-box grid h-20 grow place-items-center">
              <FileSelector className=" mx-5" setLoading={setIsLoading} />
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="card bg-base-300 rounded-box grid h-20 grow place-items-center">
              <Options className="mx-5 w-100" setLoading={setIsLoading} />
            </div>
          
        
      </div>
    </>
  );
};

export default Home;
