import "../src/assets/scss/style.scss";
import FileUpload from "./components/FileUpload/FileUpload";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ShowMeasurements from "./components/ShowMeasurments/ShowMeasurements";
import logo from "./assets/images/logo.svg";
function App() {
  return (
    <div className="App">
    <div className="header">
    <div className="header__logo">
     <img src={logo} alt="upload" />
     </div>
     </div>
      <FileUpload />
      <ShowMeasurements />
      <ToastContainer />
    </div>
  );
}

export default App;
