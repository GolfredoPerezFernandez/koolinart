import Skeleton from "@mui/material/Skeleton";

const styles = {
  width: 60,
  height: 60,
  cursor: "pointer",
  borderRadius: 3,
  objectFit: "cover",
  mx: 2,
  my: 1.5,
  backgroundColor: "common.two",
};

function SkeletonTopSeller() {
  return <Skeleton variant="rectangular" sx={styles} />;
}

export default SkeletonTopSeller;
