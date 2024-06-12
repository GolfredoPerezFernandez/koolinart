import Skeleton from "@mui/material/Skeleton";

const styles = {
  width: "75px",
  height: "68px",
  cursor: "pointer",
  borderRadius: "10px",
  objectFit: "cover",
  position: "absolute",
  bottom: "-10%",
  backgroundColor: "common.two",
};

function SkeletonColletionsAvatar() {
  return <Skeleton variant="rectangular" sx={styles} />;
}

export default SkeletonColletionsAvatar;
