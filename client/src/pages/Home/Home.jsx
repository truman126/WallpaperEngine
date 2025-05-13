import FileSelector from "./FileSelector";
import File from "./File";
import Options from "./Options";
import { useState, useEffect } from "react";


const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
  }, [isLoading]);

  return (
    <div className="h-full">
      {isLoading && (
        <div className="h-1/2 flex justify-center items-center">
          <div className="flex-none loading loading-spinner w-24 h-24"></div>
        </div>
      )}
      <div className="flex flex-row flex-wrap justify-evenly h-full" style={{ visibility: isLoading ? "hidden" : "" }}>



        <FileSelector setLoading={setIsLoading} />

        {/* <div className="divider divider-horizontal"></div> */}

        <Options setLoading={setIsLoading} />



      </div>
    </div>
  );
};

export default Home;
