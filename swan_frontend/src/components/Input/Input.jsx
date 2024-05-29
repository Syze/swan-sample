import React, { forwardRef } from "react";
import upload from "../../assets/images/upload-cloud.svg";
import styles from "./Input.module.scss";

const Input = forwardRef(({ type = "text", placeholder = "", accept = "", onChange, label = "", name = "", multiple = false, value = "" }, ref) => {
  return (
    <div className={`${styles.input} ${type === "file" ? styles.inputFile : ``}`}>
      <label>{label}</label>
      <div className={`${styles.inputWrapper}`}>
        {type === "file" ? (
          <input type={type} accept={accept} onChange={onChange && onChange} name={name} multiple={multiple} />
        ) : (
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            accept={accept}
            onChange={onChange && onChange}
            name={name}
            multiple={multiple}
            value={value}
          />
        )}
        {type === "file" && value === "" ? (
          <>
            <img src={upload} alt="upload" />
            <p>
              <span>Click to upload</span> or drag and drop
            </p>
          </>
        ) : (
          <>{value?.name}</>
        )}
      </div>
    </div>
  );
});

export default Input;
