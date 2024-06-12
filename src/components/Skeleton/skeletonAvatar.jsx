import Skeleton from "@mui/material/Skeleton";

const styles = {
  width: 65,
  height: 65,
  cursor: "pointer",
  borderRadius: 5,
  objectFit: "cover",
  backgroundColor: "common.two",
};

function SkeletonAvatar() {
  return <Skeleton variant="rectangular" sx={styles} />;
}

export default SkeletonAvatar;
