import React from "react";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./FileUpload.css";

const FileUpload = (props) => (
  // Placeholder to verify FileUpload provides the desired file object
  // eslint-disable-next-line react/prop-types
  <Dropzone onDrop={(files) => props.uploadHandler(files)}>
    {({ getRootProps, getInputProps }) => (
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...getRootProps({
          className: "dropzone dropContainer",
          onDrop: (event) => event.stopPropagation(),
        })}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input {...getInputProps()} />
        <CloudUploadIcon />
        <p>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className='uploadPrompt'>Click to upload</a> or drag and drop
        </p>
        <p className='uploadSpecs'>
          {/* eslint-disable-next-line react/prop-types */}
          {`${props.fileTypes.join(", ")} (max ${props.maxSize} MiB)`}
        </p>
      </div>
    )}
  </Dropzone>
);

export default FileUpload;
