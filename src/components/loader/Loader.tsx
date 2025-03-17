import "./loader.css";
//@ts-ignore
import loaderSvg from "../../assets/common/loader.svg";
const Loader = () => {
  return (
    <div className="parent_div">
      <div>
        <img src={loaderSvg} className="image" alt="loader" />
      </div>
    </div>
  );
};

export default Loader;
