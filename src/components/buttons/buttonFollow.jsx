import { useContext, useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { FollowContext } from "@/context/Follow/FollowContext";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";

function ButtonStyles() {
  return {
    backgroundColor: "secondary.main",
    borderRadius: "10px",
    transition: "0.6s",
    "&:hover": {
      backgroundColor: "common.white",
      color: "text.primary",
      outline: "2px solid #C02327",
    },
    color: "common.white",
    width: "fit-content",
    height: { xs: "32px", md: "45px" },
    padding: { xs: "8px 20px", sm: "20px", md: "1px 23px 1px 18px" },
    fontSize: { xs: "10px" },
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
  };
}

export default function ButtonFollows(props) {
  let navigate = useNavigate();
  const { Follow, NotFollow, ReviewToFollow } = useContext(FollowContext);
  const { UserRender, WatchFollow } = useBoundStore((state) => state, shallow);
  const [resulReview, setResulReview] = useState(false);
  const [loading, setLoading] = useState(false);
  const followings = props.followings;

  useEffect(() => {
    const fetchData = async () => {
      const result = await ReviewToFollow(followings);
      setResulReview(result);
    };
    fetchData();
  }, [WatchFollow, followings]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await ReviewToFollow(followings);
      setResulReview(result);
    };
    fetchData();
  }, []);

  return resulReview ? (
    <Button
      sx={ButtonStyles()}
      onClick={() => {
        if (UserRender.length === 0) {
          navigate(`/sign-in`);
        } else {
          setLoading(true);
          NotFollow(followings);
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        }
      }}
    >
      Unfollow
    </Button>
  ) : (
    <Button
      sx={ButtonStyles()}
      onClick={() => {
        if (UserRender.length === 0) {
          navigate(`/sign-in`);
        } else {
          setLoading(true);
          Follow(followings);
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        }
      }}
    >
      <AddIcon sx={{ fontSize: { xs: "18px", lg: "19px" }, mr: "5px" }} />
      {loading ? <CircularProgress size={25} /> : "Follow"}
    </Button>
  );
}
