import { useMemo } from "react";
import "./loader.css";

function Loader() {
  const gearPath = useMemo(() => {
    const base = import.meta.env.BASE_URL || "/";
    return `${base}gear.png`;
  }, []);

  return (
    <div className="loader-container">
      <img src={gearPath} alt="loading" className="gear-loader" />
    </div>
  );
}

export default Loader;
