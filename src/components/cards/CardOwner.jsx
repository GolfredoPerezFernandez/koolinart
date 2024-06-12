import SkeletonAvatarCardPerfilNft from "@/components/Skeleton/skeletonAvatarCardPerfilNft";
import SkeletonTitle from "@/components/Skeleton/skeletonTitle";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function StyledContainer() {
  return {
    width: { xs: "100px", sm: "115px", md: "120px", lg: "130px" },
    height: { xs: "100%", lg: "140px" },
    backgroundColor: "primary.main",
  };
}
function StyledContainerCardMediaAvatar() {
  return {
    width: "55px",
    height: "56px",
    borderRadius: "15px",
    objectFit: "cover",
    cursor: "pointer",
    boxShadow:
      "0px 1px 1px rgb(0 0 0 / 1%), 0px 1px 33.4221px rgb(0 0 0 / 12%), 0px 21.3363px 17.869px rgb(0 0 0 / 10%), 0px 12.5216px 10.0172px rgb(0 0 0 / 1%), 0px 6.6501px 5.32008px rgb(0 0 0 / 6%), 0px 2.76726px 2.21381px rgb(0 0 0 / 14%)",
  };
}
function StyledCardContent() {
  return {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  };
}
const CardOwner = (props) => {
  let navigate = useNavigate();
  return (
    <Card sx={StyledContainer}>
      <CardContent sx={StyledCardContent}>
        {props.title ? (
          <Typography
            variant="subtitle2"
            sx={{
              color: "text.secondary",
              cursor: "pointer",
            }}
          >
            {props.title}
          </Typography>
        ) : (
          <SkeletonTitle />
        )}
        {props.avatarOwner ? (
          <CardMedia
            image={props.avatarOwner}
            onClick={() => {
              navigate(`/profile-artist/${props.directionAddress}`);
            }}
            component="img"
            sx={StyledContainerCardMediaAvatar}
            alt="avartar owner image"
          />
        ) : (
          <SkeletonAvatarCardPerfilNft />
        )}
        {props.directionAddress ? (
          <Tooltip title={props.directionAddress} followCursor>
            <Typography
              variant="subtitle2"
              sx={{
                color: "text.secondary",
              }}
            >
              {props.directionAddress.slice(0, 6)}...
              {props.directionAddress.slice(-4)}
            </Typography>
          </Tooltip>
        ) : (
          <SkeletonTitle />
        )}
      </CardContent>
    </Card>
  );
};

export default CardOwner;
