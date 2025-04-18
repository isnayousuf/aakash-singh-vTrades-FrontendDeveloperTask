import {Loader as LoaderIcon} from "lucide-react";

const Loader = () => {
  return (
    <div className="loader-container">
      <LoaderIcon className="spinner"  strokeWidth={1.25} absoluteStrokeWidth />
    </div>
  );
};

export default Loader;