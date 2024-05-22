import React, { useState } from "react";
import Input from "./Input";
import ApiService from "../services/ApiService";

const scan_Id = crypto.randomUUID();
const apiService = new ApiService();
const FileUpload = () => {
  const [objMetaData, setObjMetaData] = useState({
    gender: "",
    scan_Id,
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
    try {
      const objMetaDataArray = Object.entries(objMetaData).map(([key, val]) => ({ [key]: val }));
      const videoFile = new File([files], `${scan_Id}.webm`, {
        type: files.type,
      });
      const data = {
        file: videoFile,
        scanId: scan_Id,
        objMetaData: objMetaDataArray,
      };
      await apiService.fileUpload(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFileUpload}>
        <Input placeholder="ex - male" onChange={handleChange} name="gender" label="Gender" value={objMetaData.gender} />
        <Input type="email" placeholder="ex - abc@example.com " onChange={handleChange} name="email" label="Email" value={objMetaData.email} />
        <Input placeholder="ex - 158" onChange={handleChange} name="height" label="Height(cm)" value={objMetaData.gender} />
        <Input
          placeholder="ex - swanstorestaging.myshopify.com"
          onChange={handleChange}
          name="customer_store_url"
          label="Customer Store Url"
          value={objMetaData.customer_store_url}
        />
        <Input placeholder="ex - 0" onChange={handleChange} name="clothes_fit" label="Clothes Fit" value={objMetaData.clothes_fit} />
        <Input placeholder="ex - clothing_scan" onChange={handleChange} name="scan_type" label="Scan Type" value={objMetaData.scan_type} />
        <Input
          placeholder="ex - https://example.com/webhook"
          onChange={handleChange}
          name="callback_url"
          label="Callback Url"
          value={objMetaData.callback_url}
        />
        <Input
          placeholder="ex - 30.2789"
          onChange={handleChange}
          name="focal_length"
          label="Focal length of device camera"
          value={objMetaData.focal_length}
        />
        <Input type="file" onChange={handleChange} name="file" label="Focal length of device camera" value={files} accept="video/*" />
        <Input type="submit" />
      </form>
    </div>
  );
};

export default FileUpload;
