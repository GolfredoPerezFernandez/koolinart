import Skeleton from "@mui/material/Skeleton";

function styles(borderRadius = 2) {
  return {
    width: { xs: "190px", sm: "200px", lg: "220px" },
    height: { xs: "200px", lg: "220px" },
    borderRadius: "50px",
    backgroundColor: "common.two",
    margin: "1rem auto",
    maxWidth: "100%",
    objectFit: "cover",
  };
}

function SkeletonCardMedia(props) {
  return <Skeleton variant="rectangular" sx={styles(props.borderRadius)} />;
}

export default SkeletonCardMedia;
