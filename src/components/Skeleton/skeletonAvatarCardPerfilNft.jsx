import Skeleton from "@mui/material/Skeleton";

const styles = {
  borderRadius: "50%",
  my: 1,
  alignSelf: "center",
  width: 50,
  height: 50,
  cursor: "pointer",
  objectFit: "cover",
  backgroundColor: "common.two",
};

function SkeletonAvatarCardPerfilNft() {
  return <Skeleton variant="rectangular" sx={styles} />;
}

export default SkeletonAvatarCardPerfilNft;
