import "../src/assets/scss/style.scss";
import FileUpload from "./components/FileUpload/FileUpload";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ShowMeasurements from "./components/ShowMeasurments/ShowMeasurements";

function App() {
  return (
    <div className="App">
      <FileUpload />
      <ShowMeasurements />
      <ToastContainer />
    </div>
  );
}

export default App;
