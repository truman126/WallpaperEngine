import { FileSelector, Options } from "../components";
import { useState, useEffect } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading)
  useEffect(() => {
    console.log("using effect")
  }, [isLoading]);

  return (
    <>
    {isLoading && 
    <div className="loading"><h1>LOADING</h1><section className="loader"></section></div>}

    <div className="home" style={{visibility: isLoading ? 'hidden' : '' }} >
      <FileSelector setLoading={setIsLoading} />
      <Options  setLoading={setIsLoading} />
    </div>
    
    </>
  );
};

export default Home;
