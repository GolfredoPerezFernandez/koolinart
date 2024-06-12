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

export default function TabsProfileArtistFollowerFollowing() {
  const { ShowFollowerOrFollowingArtist, TotalShowFollowerOrFollowingArtist } =
    useContext(FollowContext);
  const {
    GetFilterCoincidenceProfileUserFollowers,
    GetFilterValueProfileUserFollowers,
    GetFilterCoincidenceProfileUserFollowings,
  } = useContext(InputsSearchContext);
  const {
    UserRender,
    ThemeModeState,
    ProfileArtistFollowerOrFollowing,
    FilterCoincidenceProfileUserFollowers,
    FilterCoincidenceProfileUserFollowings,
    TotalProfileFollowerOrFollowingArtist,
    ChangeProfileArtistFollowerOrFollowing,
    ChangeTotalProfileFollowerOrFollowingArtist,
    ChangeTypeAlert,
    ChangeTitleAlert,
    ChangeStateAlert,
  } = useBoundStore((state) => state, shallow);

  async function onChangeTypeNftMarket(_, value) {
    try {
      if (value === 0) {
        await TotalShowFollowerOrFollowingArtist("following");
        await ShowFollowerOrFollowingArtist("following", 0);
      } else {
        await TotalShowFollowerOrFollowingArtist("follower");
        await ShowFollowerOrFollowingArtist("follower", 0);
      }
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
  }

  async function NextsPrimary() {
    try {
      await ShowFollowerOrFollowingArtist(
        "following",
        ProfileArtistFollowerOrFollowing.length
      );
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
  }

  async function NextsSecondary() {
    try {
      await ShowFollowerOrFollowingArtist(
        "follower",
        ProfileArtistFollowerOrFollowing.length
      );
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
  }
  async function ResetFollower() {
    try {
      await TotalShowFollowerOrFollowingArtist("follower");
      await ShowFollowerOrFollowingArtist("follower", 0);
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
  }

  async function ResetFollowings() {
    try {
      await TotalShowFollowerOrFollowingArtist("following");
      await ShowFollowerOrFollowingArtist("following", 0);
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        await TotalShowFollowerOrFollowingArtist("following");
        await ShowFollowerOrFollowingArtist(
          "following",
          ProfileArtistFollowerOrFollowing.length
        );
      };
      fetchData();
    } catch (error) {
      ChangeTypeAlert(`error`);
      ChangeTitleAlert(error);
      ChangeStateAlert(true);
    }
    return async () => {
      ChangeProfileArtistFollowerOrFollowing([]);
      ChangeTotalProfileFollowerOrFollowingArtist(0);
    };
  }, []);

  return (
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
            ProfileArtistFollowerOrFollowing.length != undefined
              ? ProfileArtistFollowerOrFollowing.length
              : 0
          }
          next={NextsPrimary}
          hasMore={
            TotalProfileFollowerOrFollowingArtist >
            ProfileArtistFollowerOrFollowing.length
          }
          loader={
            <Typography variant="h2" textAlign="center">
              Loading...
            </Typography>
          }
          style={{ overflow: "hidden" }}
        >
          <Box sx={StyledContainerCard}>
            {ProfileArtistFollowerOrFollowing?.length > 0 ? (
              ProfileArtistFollowerOrFollowing.map((value, index) => {
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
            ProfileArtistFollowerOrFollowing.length != undefined
              ? ProfileArtistFollowerOrFollowing.length
              : 0
          }
          next={NextsSecondary}
          hasMore={
            TotalProfileFollowerOrFollowingArtist >
            ProfileArtistFollowerOrFollowing.length
          }
          loader={
            <Typography variant="h2" textAlign="center">
              Loading...
            </Typography>
          }
          style={{ overflow: "hidden" }}
        >
          <Box sx={StyledContainerCard}>
            {ProfileArtistFollowerOrFollowing?.length > 0 ? (
              ProfileArtistFollowerOrFollowing.map((value, index) => {
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
  );
}
