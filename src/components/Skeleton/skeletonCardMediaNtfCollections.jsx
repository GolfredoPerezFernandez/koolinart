import Skeleton from "@mui/material/Skeleton";

function styles(borderRadius = 2) {
  return {
    width: { xs: "170px", md: "210px", lg: "180px", xl: "220px" },
    height: { xs: "190px", md: "210px" },
    borderRadius: { xs: "20px", md: "50px" },
    backgroundColor: "common.two",
    margin: "1rem auto",
    maxWidth: "100%",
    objectFit: "cover",
  };
}

function SkeletonCardMediaNftcollections(props) {
  return <Skeleton variant="rectangular" sx={styles(props.borderRadius)} />;
}

export default SkeletonCardMediaNftcollections;
