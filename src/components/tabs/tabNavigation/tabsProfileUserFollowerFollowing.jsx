import { useEffect, useContext } from "react";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import { Typography, Box, CardMedia } from "@mui/material";
import {
  TabsUnstyled,
  TabsListUnstyled,
  TabUnstyled,
  TabPanelUnstyled,
  buttonUnstyledClasses,
} from "@mui/base";
import { styled } from "@mui/material";
import { FollowContext } from "@/context/Follow/FollowContext";
import { InputsSearchContext } from "@/context/InputsSearch/InputsSearchContext";
import { RotateLeft } from "@mui/icons-material";
import CardFollowersFollowings from "@/components/cards/cardFollowersFollowings";
import InputSearchGlobals from "@/components/inputs/inputSearchGlobal";
import InfiniteScroll from "react-infinite-scroll-component";

const TabsList = styled(TabsListUnstyled)`
  width: 100%;
  background-color: transparent;
  display: flex;
  gap: 20px;
`;
const Tab = styled(TabUnstyled)`
  height: fit-content;
  padding: 5px 15px;
  margin-bottom: 40px;
  width: 100%;
  color: #ffffff;
  cursor: pointer;
  border: none;
  background-color: #c02327;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  transition: 0.3s;
  align-items: center;
  &:hover {
    background-color: #eae8e8;
    color: #c02327;
  }
  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &.Mui-selected {
    color: #c02327;
    background-color: #eae8e8;
  }
`;
const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
`;
function NotFollow(props) {
  return (
    <Box
      sx={{
        border: "2px solid",
        borderColor: "secondary.icon",
        borderRadius: "10px",
        p: 5,
      }}
    >
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          color: "text.secondary",
        }}
      >
        {props.title}
      </Typography>
    </Box>
  );
}
function StyledTabPanel() {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  };
}
function StyledContainerCard() {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    p: { xs: "10px 5px", sm: "10px 10px" },
  };
}

export default function TabsProfileUserFollowerFollowing() {
  const { ShowFollowerOrFollowing, TotalShowFollowerOrFollowing } =
    useContext(FollowContext);
  const {
    GetFilterCoincidenceProfileUserFollowers,
    GetFilterValueProfileUserFollowers,
    GetFilterCoincidenceProfileUserFollowings,
  } = useContext(InputsSearchContext);
  const {
    UserRender,
    ThemeModeState,
    FollowerOrFollowing,
    FilterCoincidenceProfileUserFollowers,
    FilterCoincidenceProfileUserFollowings,
    TotalFollowerOrFollowing,
    ChangeFollowerOrFollowing,
    ChangeTotalFollowerOrFollowing,
    ChangeTypeAlert,
    ChangeTitleAlert,
    ChangeStateAlert,
  } = useBoundStore((state) => state, shallow);

  let ghost_koolinart =
    ThemeModeState == "light"
      ? "https://ipfs.moralis.io:2053/ipfs/QmduM5emiDfYSKp9bVVJHzsGKa4awY9PfzHdtzyMSiPSY8/0xE568887Bf75AeA78147730CC4101aDf09626759E/ghost_koolinart_light.svg"
      : "https://ipfs.moralis.io:2053/ipfs/QmWMZLi6dDWHRe29C4eVv3BS6JzkxLXc84H8Vt2MdBgpiX/0xE568887Bf75AeA78147730CC4101aDf09626759E/ghost_koolinart.svg";

  async function onChangeTypeNftMarket(_, value) {
    try {
      if (value === 0) {
        await TotalShowFollowerOrFollowing("following");
        await ShowFollowerOrFollowing("following", 0);
      } else {
        await TotalShowFollowerOrFollowing("follower");
        await ShowFollowerOrFollowing("follower", 0);
      }
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
  }

  async function NextsPrimary() {
    try {
      await ShowFollowerOrFollowing("following", FollowerOrFollowing.length);
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
  }
  async function NextsSecondary() {
    try {
      await ShowFollowerOrFollowing("follower", FollowerOrFollowing.length);
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
  }
  async function ResetFollower() {
    try {
      await TotalShowFollowerOrFollowing("follower");
      await ShowFollowerOrFollowing("follower", 0);
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
  }
  async function ResetFollowings() {
    try {
      await TotalShowFollowerOrFollowing("following");
      await ShowFollowerOrFollowing("following", 0);
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        await TotalShowFollowerOrFollowing("following");
        await ShowFollowerOrFollowing("following", FollowerOrFollowing.length);
      };
      fetchData();
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
    return async () => {
      ChangeFollowerOrFollowing([]);
      ChangeTotalFollowerOrFollowing(0);
    };
  }, []);

  return UserRender.length != 0 ? (
    <TabsUnstyled defaultValue={0} onChange={onChangeTypeNftMarket}>
      <TabsList>
        <Tab>
          <Typography variant="body1">Followings</Typography>
        </Tab>
        <Tab>
          <Typography variant="body1">Followers</Typography>
        </Tab>
      </TabsList>
      <TabPanel value={0} sx={StyledTabPanel}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <InputSearchGlobals
            title="Search Followings"
            filterOptions={FilterCoincidenceProfileUserFollowings}
            GetFilterGlobal={GetFilterCoincidenceProfileUserFollowings}
            goTo={false}
            SetFuction={GetFilterValueProfileUserFollowers}
          />
          <RotateLeft
            fontSize="large"
            sx={{ cursor: "pointer" }}
            onClick={() => ResetFollowings()}
          />
        </Box>

        <InfiniteScroll
          dataLength={
            FollowerOrFollowing.length != undefined
              ? FollowerOrFollowing.length
              : 0
          }
          next={NextsPrimary}
          hasMore={TotalFollowerOrFollowing > FollowerOrFollowing.length}
          loader={
            <Typography variant="h2" textAlign="center">
              Loading...
            </Typography>
          }
          style={{ overflow: "hidden" }}
        >
          <Box sx={StyledContainerCard}>
            {FollowerOrFollowing?.length > 0 ? (
              FollowerOrFollowing.map((value, index) => {
                return (
                  <Box key={index}>
                    <CardFollowersFollowings info={value} />
                  </Box>
                );
              })
            ) : (
              <NotFollow title="No Followings" />
            )}
          </Box>
        </InfiniteScroll>
      </TabPanel>
      <TabPanel value={1} sx={StyledTabPanel}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <InputSearchGlobals
            title="Search Followers"
            filterOptions={FilterCoincidenceProfileUserFollowers}
            GetFilterGlobal={GetFilterCoincidenceProfileUserFollowers}
            goTo={false}
            SetFuction={GetFilterValueProfileUserFollowers}
          />
          <RotateLeft
            fontSize="large"
            sx={{ cursor: "pointer" }}
            onClick={() => ResetFollower()}
          />
        </Box>
        <InfiniteScroll
          dataLength={
            FollowerOrFollowing.length != undefined
              ? FollowerOrFollowing.length
              : 0
          }
          next={NextsSecondary}
          hasMore={TotalFollowerOrFollowing > FollowerOrFollowing.length}
          loader={
            <Typography variant="h2" textAlign="center">
              Loading...
            </Typography>
          }
          style={{ overflow: "hidden" }}
        >
          <Box sx={StyledContainerCard}>
            {FollowerOrFollowing?.length > 0 ? (
              FollowerOrFollowing.map((value, index) => {
                return (
                  <Box key={index}>
                    <CardFollowersFollowings info={value} />
                  </Box>
                );
              })
            ) : (
              <NotFollow title="No Followers" />
            )}
          </Box>
        </InfiniteScroll>
      </TabPanel>
    </TabsUnstyled>
  ) : (
    <Box
      sx={{
        py: "20px",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardMedia
        component="img"
        image={ghost_koolinart}
        alt="Image NFT"
        sx={{
          width: "250px",
          objectFit: "cover",
        }}
      />
      <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
        Nothing found
      </Typography>
    </Box>
  );
}
