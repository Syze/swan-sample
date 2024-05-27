import React, { useState } from "react";
import Input from "../Input/Input";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../../constant/Constant";
import { v4 as uuidv4 } from "uuid";
import CustomTable from "../CustomTable/CustomTable";
import { toast } from "react-toastify";
import styles from "./ShowMeasurements.module.scss";

const customMeasurementValue = (data) => {
  delete data["isMeasured"];
  delete data["id"];
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
  const [loading, setLoading] = useState(false);
  const handleOnChange = (event) => {
    setScanId(event.target.value);
  };

  const getMeasurementsPoints = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${REACT_APP_BASE_URL}/file-upload/measurements/${scanId}`);
      if (res?.data?.isMeasured) {
        setMeasurementsData(customMeasurementValue(res?.data));
      } else {
        toast.info("Measurement not ready corresponding to this scan id ");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={`${styles.showMeasurements}`}>
      <div>
        <h2>Scan</h2>
        <Input label="Enter your scan id" type="text" value={scanId} onChange={handleOnChange} placeholder="000101010101010" />
        <button className="button full" disabled={!scanId || loading} onClick={getMeasurementsPoints}>
          Get Measurements
        </button>
      </div>
      <div>
        {measurementsData && (
          <div className="custom-table ">
            <div className="custom-table__scroll">
              <div className={`flex ${styles.showMeasurements__row}`}>
                {measurementsData?.firstData?.length > 0 ? (
                  <div className={`${styles.showMeasurements__col}`}>
                    <CustomTable data={measurementsData?.firstData} />
                  </div>
                ) : (
                  <></>
                )}
                {measurementsData?.secondData?.length > 0 ? (
                  <div className={`${styles.showMeasurements__col}`}>
                    <CustomTable data={measurementsData?.secondData} />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowMeasurements;
