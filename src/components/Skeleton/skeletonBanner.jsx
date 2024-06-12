import Skeleton from "@mui/material/Skeleton";

function styles() {
  return {
    height: "100%",
    width: "100%",
    backgroundColor: "common.two",
    objectFit: "cover",
  };
}

function SkeletonBanner() {
  return <Skeleton variant="rectangular" sx={styles()} />;
}

export default SkeletonBanner;
