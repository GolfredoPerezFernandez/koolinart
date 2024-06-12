import React, { useContext, useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LikesContext } from "@/context/Likes/LikesContext";
import { shallow } from "zustand/shallow";
import { useBoundStore } from "@/store/index";
import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";

function ButtonStyles() {
  return {
    padding: { xs: "5px", sm: "8px", md: "10px" },
    boxShadow:
      "0px 10px 10px rgba(0, 0, 0, 0.02), 0px 1.7776px 3.4221px rgba(0, 0, 0, 0.115017), 0px 2.3363px 17.869px rgba(0, 0, 0, 0.0953772), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.08), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0646228), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0449833)",
  };
}

function StyledIconButton() {
  return {
    fontSize: { xs: "30px", sm: "40px", md: "45px" },
    color: "secondary.icon",
    transition: "0.6s",
    "&:hover": {
      color: "secondary.main",
    },
  };
}
export default function ButtonLikes(props) {
  let navigate = useNavigate();
  const { UserRender, likes } = useBoundStore((state) => state, shallow);
  const { WatchLikesFunction, LikeFunc, DoNotLikesFunc, likeUserStateFunc } =
    useContext(LikesContext);

  const [resulReview, setResulReview] = useState(false);
  const [changeFunct, setChangeFunct] = useState(true);
  const token = props.token;
  const collectionAddress = props.collectionAddress;

  useEffect(() => {
    const fetchData = async () => {
      await WatchLikesFunction(token, collectionAddress);
      const result = await likeUserStateFunc(token, collectionAddress);
      setResulReview(result);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await WatchLikesFunction(token, collectionAddress);
      const result = await likeUserStateFunc(token, collectionAddress);
      setResulReview(result);
    };

    fetchData();
  }, [changeFunct]);

  return resulReview ? (
    <Button
      sx={ButtonStyles}
      onClick={() => {
        if (UserRender.length === 0) {
          navigate(`/sign-in`);
        } else {
          DoNotLikesFunc(token, collectionAddress);
          setChangeFunct(!changeFunct);
        }
      }}
    >
      <FavoriteOutlined sx={StyledIconButton} />
      <Typography
        variant="subtitle2"
        sx={{
          textAlign: "center",
          color: "text.secondary",
        }}
      >
        {likes}
      </Typography>
    </Button>
  ) : (
    <Button
      sx={ButtonStyles}
      onClick={() => {
        if (UserRender.length === 0) {
          navigate(`/sign-in`);
        } else {
          LikeFunc(token, collectionAddress);
          setChangeFunct(!changeFunct);
        }
      }}
    >
      <FavoriteBorderOutlined sx={StyledIconButton} />
      <Typography
        variant="subtitle2"
        sx={{
          textAlign: "center",
          color: "text.secondary",
        }}
      >
        {likes}
      </Typography>
    </Button>
  );
}
