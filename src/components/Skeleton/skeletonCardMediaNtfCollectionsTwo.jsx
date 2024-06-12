import Skeleton from "@mui/material/Skeleton";

function styles(borderRadius = 2) {
  return {
    width: { xs: "130px", sm: "150px", md: "170px" },
    height: { xs: "230px", sm: "280px", md: "290px" },
    borderRadius: { xs: "20px", lg: "50px" },
    backgroundColor: "common.two",
    maxWidth: "100%",
    objectFit: "cover",
  };
}

function SkeletonCardMediaNftCollectionsTwo(props) {
  return <Skeleton variant="rectangular" sx={styles(props.borderRadius)} />;
}

export default SkeletonCardMediaNftCollectionsTwo;
