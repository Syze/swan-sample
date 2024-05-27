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
  const [measurementsData, setMeasurementsData] = useState(
    {
        "firstData": [
            {
                "id": "504ad932-c1d5-4c3f-8ecc-5a795b0f1599",
                "name": "id",
                "value": "97bcd39a-860e-4ffe-a507-f9d0904bad0f"
            },
            {
                "id": "6ea1bcfe-1ae1-48ff-9c65-56e916437857",
                "name": "ankle",
                "value": "25.222"
            },
            {
                "id": "ffcb48c4-2150-4e2a-a92c-757013c7add0",
                "name": "bust",
                "value": "87.025"
            },
            {
                "id": "566dc342-e94c-41e4-b3cc-57957d55f04b",
                "name": "elbow",
                "value": "23.506"
            },
            {
                "id": "a73d1c6d-1056-4497-a605-f95951efa21b",
                "name": "high_hip",
                "value": "88.613"
            },
            {
                "id": "013e3421-b78e-4aea-82ca-1ad519bf223a",
                "name": "inseam",
                "value": "69.939"
            },
            {
                "id": "994a6860-9131-4f4d-b01f-f8f9e1b77425",
                "name": "nape_to_waist",
                "value": "48.805"
            },
            {
                "id": "d998c806-105c-4997-81d2-459903f4c05f",
                "name": "neck_circ",
                "value": "31.102"
            },
            {
                "id": "ac247da1-d984-4eb1-812f-262f35512648",
                "name": "thigh",
                "value": "55.688"
            },
            {
                "id": "9abaa1e3-de2e-4ac4-b531-43d5760d6326",
                "name": "wrist",
                "value": "14.369"
            },
            {
                "id": "dc1f89ea-28aa-4e5e-99c4-974f2d0c0791",
                "name": "head",
                "value": "49.817"
            },
            {
                "id": "18e8ec36-8391-48b6-bafc-c41efeaea37e",
                "name": "shoulder",
                "value": "15.776"
            },
            {
                "id": "96c120fe-0a75-427b-89b0-52af7ff5e0f6",
                "name": "under_bust",
                "value": "85.261"
            }
        ],
        "secondData": [
            {
                "id": "c184739e-955a-4912-94bc-fda2388cbf4d",
                "name": "across_back_shoulder",
                "value": "35.060"
            },
            {
                "id": "300f2684-3b87-43c7-83b8-daa6b69f8e73",
                "name": "arm_length",
                "value": "54.615"
            },
            {
                "id": "013b2080-0f5f-4be2-9c08-32e606c5bc1c",
                "name": "calf",
                "value": "35.089"
            },
            {
                "id": "52f48945-486f-4b94-bc4d-3abe28bde762",
                "name": "forearm",
                "value": "23.877"
            },
            {
                "id": "cd2e6a9c-5542-449b-bc2f-b4742289e84d",
                "name": "hip",
                "value": "92.861"
            },
            {
                "id": "a2c605d1-0cfc-445b-af7c-ad109101abca",
                "name": "knee",
                "value": "36.128"
            },
            {
                "id": "43f6987b-63dd-4ea9-ab25-17de4d7c39b8",
                "name": "neck_base",
                "value": "32.731"
            },
            {
                "id": "2410ee61-f221-47f4-9cfc-91c2c2f13ff0",
                "name": "seat",
                "value": "53.789"
            },
            {
                "id": "d72eea75-986e-4f65-8317-be7f1f30ad1b",
                "name": "waist",
                "value": "78.136"
            },
            {
                "id": "da71fa5a-ce70-475f-a2e1-c173c444a32f",
                "name": "bicep",
                "value": "28.703"
            },
            {
                "id": "0d4e5859-c46a-4ed7-9611-df6d73642e5a",
                "name": "inseam_to_ankle",
                "value": "66.183"
            },
            {
                "id": "3fb877c0-938c-4dac-8e72-e52753fd14fe",
                "name": "torso",
                "value": "73.994"
            },
            {
                "id": "f7ecd35d-0ba9-43e6-921f-82a585968d47",
                "name": "waist_bellybutton",
                "value": null
            }
        ]
    }
  );
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
    <div className={`${styles.showMeasurements}`}>
      <div>
      <h2>Scan</h2>
        <Input label="Enter your scan id" type="text" value={scanId} onChange={handleOnChange} placeholder="000101010101010" />
        <button className="button full" disabled={!scanId} onClick={getMeasurementsPoints}>
          Get Measurements
        </button>
      </div>
      <div>
        {measurementsData && (
            <div className="custom-table ">
            <div className="custom-table__scroll">
            <div  className={`flex ${styles.showMeasurements__row}`}>

            {measurementsData?.firstData?.length > 0 ?  <div className={`${styles.showMeasurements__col}`}><CustomTable data={measurementsData?.firstData} /></div> : <></>}
            {measurementsData?.secondData?.length > 0 ?  <div className={`${styles.showMeasurements__col}`}><CustomTable data={measurementsData?.secondData} /></div> : <></>}
       </div>
       </div>
       </div>
        )}
      </div>
    </div>
  );
};

export default ShowMeasurements;
