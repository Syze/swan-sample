import React, { useState } from "react";
import Input from "../Input/Input";
import ApiService from "../../services/ApiService";
import styles from "./FileUpload.module.scss";
import logo from "../../assets/images/logo.svg";
import { toast } from "react-toastify";
const apiService = new ApiService();
const FileUpload = () => {
  const [loading, setLoading] = useState(false);
  const [objMetaData, setObjMetaData] = useState({
    gender: "",
    email: "",
    focal_length: "",
    height: "",
    customer_store_url: "",
    clothes_fit: "",
    scan_type: "",
    callback_url: "",
  });
  const [files, setFiles] = useState();
  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "file") {
      setFiles(event.target.files[0]);
    } else {
      setObjMetaData({ ...objMetaData, [name]: value });
    }
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    setLoading(true);
    const scan_id = crypto.randomUUID();
    try {
      const formData = new FormData();
      if (files) {
        const videoFile = new File([files], `${scan_id}.webm`, {
          type: files?.type,
        });
        formData.append("file", videoFile);
      }
      const objMetaDataArray = Object.entries(objMetaData).map(([key, val]) => ({ [key]: val }));
      objMetaDataArray.push({ scan_id });
      formData.append("scanId", scan_id);
      formData.append("arrayMetaData", JSON.stringify(objMetaDataArray));
      await apiService.fileUpload(formData);
      toast.success(`This is your scan id: ${scan_id} `);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={`${styles.fileUpload}`}>
      <div className={`${styles.fileUpload__logo}`}>
        <img src={logo} alt="upload" />
      </div>

      <h2>Upload files</h2>
      <form onSubmit={handleFileUpload}>
        <div className={`${styles.fileUpload__row}`}>
          <div className={`${styles.fileUpload__col}`}></div>
          <div className={`${styles.fileUpload__col}`}></div>
        </div>

        <div className={`${styles.fileUpload__row}`}>
          <div className={`${styles.fileUpload__col}`}>
            <Input placeholder="ex - male" onChange={handleChange} name="gender" label="Gender" value={objMetaData.gender} />
          </div>
          <div className={`${styles.fileUpload__col}`}>
            <Input type="email" placeholder="ex - abc@example.com " onChange={handleChange} name="email" label="Email" value={objMetaData.email} />
          </div>
        </div>
        <div className={`${styles.fileUpload__row}`}>
          <div className={`${styles.fileUpload__col}`}>
            <Input placeholder="ex - 158" onChange={handleChange} name="height" label="Height(cm)" value={objMetaData.height} />
          </div>
          <div className={`${styles.fileUpload__col}`}>
            <Input
              placeholder="ex - swanstorestaging.myshopify.com"
              onChange={handleChange}
              name="customer_store_url"
              label="Customer Store Url"
              value={objMetaData.customer_store_url}
            />
          </div>
        </div>
        <div className={`${styles.fileUpload__row}`}>
          <div className={`${styles.fileUpload__col}`}>
            <Input placeholder="ex - 0" onChange={handleChange} name="clothes_fit" label="Clothes Fit" value={objMetaData.clothes_fit} />
          </div>
          <div className={`${styles.fileUpload__col}`}>
            <Input placeholder="ex - clothing_scan" onChange={handleChange} name="scan_type" label="Scan Type" value={objMetaData.scan_type} />
          </div>
        </div>
        <div className={`${styles.fileUpload__row}`}>
          <div className={`${styles.fileUpload__col}`}>
            <Input
              placeholder="ex - https://example.com/webhook"
              onChange={handleChange}
              name="callback_url"
              label="Callback Url"
              value={objMetaData.callback_url}
            />
          </div>
          <div className={`${styles.fileUpload__col}`}>
            <Input
              placeholder="ex - 30.2789"
              onChange={handleChange}
              name="focal_length"
              label="Focal length of device camera"
              value={objMetaData.focal_length}
            />
          </div>
        </div>
        <Input type="file" onChange={handleChange} name="file" label="Focal length of device camera" value={files} accept="video/*" />
        <button disabled={loading} className="button full" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
