import Skeleton from "@mui/material/Skeleton";

const styles = {
  backgroundColor: "common.two",
  minWidth: {
    xs: "100px",
    sm: "140px",
    md: "160px",
    lg: "160px",
  },
  maxWidth: {
    xs: "100px",
    sm: "140px",
    md: "160px",
    lg: "160px",
  },
  height: { xs: "215px", sm: "230px", md: "310px", lg: "330px" },
  cursor: "pointer",
  borderRadius: "50px",
  objectFit: "cover",
};

function SkeletonCardMediaActivityTwo() {
  return <Skeleton variant="rectangular" sx={styles} />;
}

export default SkeletonCardMediaActivityTwo;
