import { useState, useContext } from "react";
import { Grid, Button, TextField, LinearProgress } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import Axios from "axios";

import { SetPopupContext } from "../App";

const FileUploadInput = (props: any) => {
  const setPopup = useContext(SetPopupContext);

  const { uploadTo, identifier, handleInput } = props;

  const [fileSelected, setFileSelected] = useState<File>();
  const [uploadPercentage, setUploadPercentage] = useState(0);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files;

    if (!fileList) return;

    setFileSelected(fileList[0]);
  }

  const handleUpload = () => {
    if (fileSelected) {
      const data = new FormData();
      data.append("file", fileSelected, fileSelected.name);

      Axios.post(uploadTo, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              String((Math.round((progressEvent.loaded * 100) / progressEvent.total)))
            )
          );
        },
      })
        .then((response) => {
          console.log(response.data);
          handleInput(identifier, response.data.url);
          setPopup({
            open: true,
            severity: "success",
            message: response.data.message,
          });
        })
        .catch((err) => {
          console.log(err.response);
          setPopup({
            open: true,
            severity: "error",
            message: err.response.statusText,
          });
        });
    };
    }
    // if(file !== null) {
    //   data.append("File", file);
    // }
    // else {
    //   data.append("file", "")
    // }
 

  return (
    <Grid container item xs={12} direction="column" className={props.className}>
      <Grid container item xs={12} spacing={0}>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            component="label"
            style={{ width: "100%", height: "100%" }}
          >
            {props.icon}
            <input
              type="file"
              style={{ display: "none" }}
              // onChange={(event) => {
              //   console.log(event.target.files);
              //   setUploadPercentage(0);
              //   setFile(event.target.files[0]);
              // }}
              onChange = {handleChange}
              
            />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={props.label}
            value={fileSelected ? fileSelected.name || "" : ""}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="secondary"
            style={{ width: "100%", height: "100%" }}
            onClick={() => handleUpload()}
            disabled={fileSelected ? false : true}
          >
            <CloudUpload />
          </Button>
        </Grid>
      </Grid>
      {uploadPercentage !== 0 ? (
        <Grid item xs={12} style={{ marginTop: "10px" }}>
          <LinearProgress variant="determinate" value={uploadPercentage} />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default FileUploadInput;
