import Skeleton from "@mui/material/Skeleton";

const styles = {
  width: "50%",
  backgroundColor: "common.two",
  mx: "2px",
};

function SkeletonTitle(props) {
  return (
    <Skeleton
      variant="text"
      width={props.width}
      height={props.height}
      sx={styles}
    />
  );
}

export default SkeletonTitle;
