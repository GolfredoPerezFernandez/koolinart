import Skeleton from "@mui/material/Skeleton";

const styles = {
	width: "55px",
	height: "56px",
	cursor: "pointer",
	borderRadius: "15px",
	marginRight: "12px",
	objectFit: "cover",
    backgroundColor: "common.two",
};

function SkeletonAvatarCard() {
	return <Skeleton variant="rectangular" sx={styles} />;
}

export default SkeletonAvatarCard;
