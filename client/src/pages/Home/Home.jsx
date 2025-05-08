import FileSelector from "./FileSelector";
import File from "./File";
import Options from "./Options";
import { useState, useEffect } from "react";


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

        
            <div className="card rounded-box grid h-20 grow place-items-center">
              <FileSelector className=" mx-5" setLoading={setIsLoading} />
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="card rounded-box grid h-20 grow place-items-center">
              <Options className="mx-5 w-100" setLoading={setIsLoading} />
            </div>
          
        
      </div>
    </>
  );
};

export default Home;
