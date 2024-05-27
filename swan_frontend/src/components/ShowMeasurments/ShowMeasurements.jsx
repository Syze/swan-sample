import React, { useState } from "react";
import Input from "../Input/Input";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../../constant/Constant";
import { v4 as uuidv4 } from "uuid";
import CustomTable from "../CustomTable/CustomTable";
import { toast } from "react-toastify";

const customMeasurementValue = (data) => {
  delete data["isMeasured"];
  const array = Object.keys(data) ?? [];
  const firstData = [];
  const secondData = [];
  array?.forEach((el, index) => {
    const id = uuidv4();
    const value = {
      id,
      name: el,
      value: data[el],
    };
    if (index % 2 === 0) {
      firstData.push(value);
    } else {
      secondData.push(value);
    }
  });

  return { firstData, secondData };
};
const ShowMeasurements = () => {
  const [scanId, setScanId] = useState("");
  const [measurementsData, setMeasurementsData] = useState();
  const handleOnChange = (event) => {
    setScanId(event.target.value);
  };

  const getMeasurementsPoints = async () => {
    try {
      const res = await axios.get(`${REACT_APP_BASE_URL}/file-upload/measurements/${scanId}`);
      if (res?.data?.isMeasured) {
        setMeasurementsData(customMeasurementValue(res?.data));
      } else {
        toast.info("Measurement not ready corresponding to this scan id ");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong");
    }
  };
  console.log(measurementsData);
  return (
    <div>
      <div>
        {" "}
        <Input label="Enter your scan id" type="text" value={scanId} onChange={handleOnChange} placeholder="000101010101010" />
        <button disabled={!scanId} onClick={getMeasurementsPoints}>
          Get Measurements
        </button>
      </div>
      <div>
        {measurementsData && (
          <>
            {measurementsData?.firstData?.length > 0 ? <CustomTable data={measurementsData?.firstData} /> : <></>}
            {measurementsData?.secondData?.length > 0 ? <CustomTable data={measurementsData?.secondData} /> : <></>}
          </>
        )}
      </div>
    </div>
  );
};

export default ShowMeasurements;
