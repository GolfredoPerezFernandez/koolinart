import Button from "@mui/material/Button";
import { FileDownloadRounded } from "@mui/icons-material";

function ButtonStyles() {
  return {
    padding: { xs: "5px", sm: "8px", md: "10px" },
    boxShadow:
      "0px 10px 10px rgba(0, 0, 0, 0.02), 0px 1.7776px 3.4221px rgba(0, 0, 0, 0.115017), 0px 2.3363px 17.869px rgba(0, 0, 0, 0.0953772), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.08), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0646228), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0449833)",
  };
}
function StyledIcon() {
  return {
    fontSize: { xs: "30px", sm: "40px", md: "45px" },
    color: "secondary.shared",
    transition: "0.3s",
    "&:hover": {
      color: "secondary.main",
    },
  };
}
async function handleOnClick(file) {
  try {
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.blob();
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file); // or any other extension
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    throw error;
  }
}

export default function ButtonDownload(props) {
  return (
    <Button
      sx={ButtonStyles()}
      onClick={() => {
        handleOnClick(props.file);
      }}
    >
      <FileDownloadRounded sx={StyledIcon} />
    </Button>
  );
}
