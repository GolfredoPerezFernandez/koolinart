import { useState, useRef } from "react";
import { Box, Typography, CardMedia } from "@mui/material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { TaskOutlined } from "@mui/icons-material";

import imageCompression from "browser-image-compression";
function StyledContentUpload() {
  return {
    outline: "2px dashed",
    width: {
      xs: "100%",
      sm: "250px",
      md: "300px",
      lg: "350px",
      xl: "400px",
    },
    height: "250px",
    borderRadius: "30px",
    display: "flex",
    justifyContent: "center",
  };
}

export default function ImgUpload(props) {
  const {
    CreateNFtImageIdentification,
    ChangeCreateNFtImageIdentification,
    PreviewNft,
    ChangePreviewNft,
    ChangeStateAlert,
    ChangeTitleAlert,
    ChangeTypeAlert,
  } = useBoundStore((state) => state, shallow);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedVideoOrImg, setSelectedVideoOrImg] = useState();
  const inputFile = useRef(null);
  const inputFileIdentification = useRef(null);

  const changeHandlerNFt = async (event) => {
    try {
      const typeDocument = event.target.files[0] ? event.target.files[0] : "";
      let type = typeDocument.type.split("/").pop();
      props.onChangetypeFile(type);
      switch (typeDocument.type) {
        case "text/plain":
        case "application/msword":
        case "application/pdf":
        case "application/xml":
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        case "application/vnd.ms-excel":
        case "application/vnd.ms-powerpoint":
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        case "application/vnd.oasis.opendocument.tex":
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
          try {
            const reader = new FileReader();
            reader.onloadend = () => {
              const blob = new Blob([reader.result]);
              setSelectedFile(blob);
              props.onChangeNftData(blob);
            };
            reader.readAsText(typeDocument);
            break;
          } catch (error) {
            const errorMessage = JSON.stringify(error);
            const errorObjeto = JSON.parse(errorMessage);
            throw errorObjeto.message;
          }
        case "image/jpeg":
        case "image/png":
        case "image/jpg":
        case "image/GIF":
        case "image/svg+xml":
        case "image/webp":
          try {
            if (typeDocument != undefined) {
              const options = {
                maxSizeMB: 1.5,
                maxWidthOrHeight: 600,
                useWebWorker: true,
              };
              const compressedFile = await imageCompression(
                typeDocument,
                options
              );
              const preview = URL.createObjectURL(compressedFile);
              ChangePreviewNft(preview);
              setSelectedVideoOrImg("img");
              props.onChangeNftData(compressedFile);
              setSelectedFile(false);
              break;
            }
          } catch (error) {
            const errorMessage = JSON.stringify(error);
            const errorObjeto = JSON.parse(errorMessage);
            throw errorObjeto.message;
          }
        case "video/mp4":
        case "video/mp3":
        case "video/3gpp":
        case "video/mpeg":
          try {
            const preview = URL.createObjectURL(typeDocument);
            const reader = new FileReader();
            reader.onloadend = () => {
              const blob = new Blob([reader.result], {
                type: typeDocument.type,
              });
              props.onChangeNftData(blob);
              setSelectedVideoOrImg("video");
            };
            reader.readAsArrayBuffer(typeDocument);
            ChangePreviewNft(preview);
            setSelectedFile(false);
            break;
          } catch (error) {
            const errorMessage = JSON.stringify(error);
            const errorObjeto = JSON.parse(errorMessage);
            throw errorObjeto.message;
          }
        case "audio/x-m4a":
        case "audio/x-wav":
        case "audio/x-mid":
        case "audio/webm":
        case "audio/mpeg":
          try {
            const preview = URL.createObjectURL(typeDocument);
            const reader = new FileReader();
            reader.onloadend = () => {
              const blob = new Blob([reader.result], {
                type: typeDocument.type,
              });
              setSelectedVideoOrImg("audio");
              props.onChangeNftData(blob);
            };
            reader.readAsArrayBuffer(typeDocument);
            ChangePreviewNft(preview);
            setSelectedFile(false);
            break;
          } catch (error) {
            const errorMessage = JSON.stringify(error);
            const errorObjeto = JSON.parse(errorMessage);
            throw errorObjeto.message;
          }
        default:
          ChangeTypeAlert(`error`);
          ChangeTitleAlert(`File type not accepted`);
          ChangeStateAlert(true);
          break;
      }
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(`File type not accepted,${error}`);
      ChangeStateAlert(true);
    }
  };
  const changeHandlerIdentification = async (event) => {
    const imgIdentification = event.target.files[0];
    if (
      (imgIdentification != undefined &&
        imgIdentification.type === "image/jpeg") ||
      imgIdentification.type === "image/jpg" ||
      imgIdentification.type === "image/png" ||
      imgIdentification.type === "image/GIF" ||
      imgIdentification.type === "image/webp"
    ) {
      const options = {
        maxSizeMB: 1.5,
        maxWidthOrHeight: 600,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(
          imgIdentification,
          options
        );
        const preview = URL.createObjectURL(compressedFile);
        props.onChangeImgIdentification(compressedFile);
        ChangeCreateNFtImageIdentification(preview);
      } catch (error) {
        return error;
      }
    } else {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(`File type not accepted`);
      ChangeStateAlert(true);
    }
  };
  const onImageClickNft = () => {
    inputFile.current.click();
  };
  const onImageClickIdentification = () => {
    inputFileIdentification.current.click();
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Typography
        variant="h2"
        sx={{ color: "text.secondary", textAlign: "center" }}
      >
        {props.title}
      </Typography>
      <Box onClick={onImageClickIdentification} sx={StyledContentUpload}>
        <input
          type="file"
          name="inputFileIdentification"
          ref={inputFileIdentification}
          onChange={changeHandlerIdentification}
          style={{ display: "none" }}
        />
        {CreateNFtImageIdentification ? (
          <CardMedia
            component="img"
            image={CreateNFtImageIdentification}
            alt="identification img nft"
            sx={{
              borderRadius: "30px",
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { xs: 13, sm: 15, md: 16, lg: 16 },
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
            }}
          >
            click to select files <br /> JPG, PNG, GIF, WEBP <br /> Max file
            size 60mb
          </Typography>
        )}
      </Box>
      <Typography
        variant="h2"
        sx={{ color: "text.secondary", textAlign: "center" }}
      >
        {props.subTitle}
      </Typography>
      <Box onClick={onImageClickNft} sx={StyledContentUpload}>
        <input
          type="file"
          name="file"
          ref={inputFile}
          onChange={changeHandlerNFt}
          style={{ display: "none" }}
        />

        {selectedFile ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TaskOutlined sx={{ fontSize: "100px" }} />
          </Box>
        ) : PreviewNft ? (
          <CardMedia
            component={selectedVideoOrImg}
            src={PreviewNft}
            loop
            controls
            muted
            alt="video nft"
            sx={{
              borderRadius: "30px",
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <Typography
            alignSelf={"center"}
            sx={{
              textAlign: "center",
              fontSize: { xs: 13, sm: 15, md: 16, lg: 16 },
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
            }}
          >
            click to select files <br />
          </Typography>
        )}
      </Box>
    </Box>
  );
}
