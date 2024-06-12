import Skeleton from "@mui/material/Skeleton";

const styles = {
  width: { xs: "240px", sm: "220px", md: "280px", xl: "320px" },
  height: "149px",
  objectFit: "cover",
  boxShadow: 5,
  backgroundColor: "common.two",
  margin: "1em 0",
  borderRadius: "40px",
};

function SkeletonColletions() {
  return <Skeleton variant="rectangular" sx={styles} />;
}

export default SkeletonColletions;
