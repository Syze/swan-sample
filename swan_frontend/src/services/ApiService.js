import axios from "axios";
import { REACT_APP_BASE_URL } from "../constant/Constant";

class ApiService {
  fileUpload(data) {
    return axios.post(`${REACT_APP_BASE_URL}/file-upload`, data);
  }
}

export default ApiService;
