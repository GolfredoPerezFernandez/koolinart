import Skeleton from "@mui/material/Skeleton";

const styles = {
  backgroundColor: "common.two",
  width: { xs: 80, sm: 120 },
  height: { xs: 100, sm: 150 },
  cursor: "pointer",
  borderRadius: 3,
  objectFit: "cover",
};

function SkeletonCardMediaActivity() {
  return <Skeleton variant="rectangular" sx={styles} />;
}

export default SkeletonCardMediaActivity;
