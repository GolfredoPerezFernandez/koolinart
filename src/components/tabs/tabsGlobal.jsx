import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography, useMediaQuery, useTheme } from "@mui/material";
import TabsActivity from "@/components/tabs/tabNavigation/tabsActivity";
import TabsTraits from "@/components/tabs/tabNavigation/tabsTraits";
import TabsProfileUserOnSale from "@/components/tabs/tabNavigation/tabsProfileUserOnSale";
import TabsProfileUserOwned from "@/components/tabs/tabNavigation/tabsProfileUserOwned";
import TabsProfileUserCollections from "@/components/tabs/tabNavigation/tabsProfileUserCollections";
import TabsProfileUserSettings from "@/components/tabs/tabNavigation/tabsProfileUserSettings";
import TabsProfileUserWallet from "@/components/tabs/tabNavigation/tabsProfileUserWallet";
import TabsProfileUserFollowerFollowing from "@/components/tabs/tabNavigation/tabsProfileUserFollowerFollowing";
import TabsProfileArtistCreated from "@/components/tabs/tabNavigation/tabsProfileArtistCreated";
import TabsProfileArtistOnSale from "@/components/tabs/tabNavigation/tabsProfileArtistOnSale";
import TabsProfileArtistCollections from "@/components/tabs/tabNavigation/tabsProfileArtistCollections";
import TabsProfileArtistFollowerFollowing from "@/components/tabs/tabNavigation/tabsProfileArtistFollowerFollowing";
import TabsProfileCollectionOnSale from "@/components/tabs/tabNavigation/tabsProfileCollectionOnSale";
import TabsProfileCollectionOwned from "@/components/tabs/tabNavigation/tabsProfileCollectionOwned";

function StyledTitles() {
  return {
    color: "text.secondary",
    opacity: "0.8",
    textTransform: "capitalize",
    "&.Mui-selected": {
      color: "text.primary",
      opacity: "1",
    },
    "&:hover": {
      cursor: "pointer",
    },
  };
}

function StyledTabs() {
  return {
    border: "3px solid #C02327",
    borderRadius: "10px",
    width: {
      xs: "250px",
      sm: "360px",
      md: "550px",
      lg: "750px",
      xl: "inherit",
    },
    display: "flex",
  };
}

function SelectTab(name) {
  switch (name) {
    case "perfilNft":
      return [
        <Tab
          value="1"
          key="Traits"
          sx={StyledTitles}
          label={<Typography variant="subtitle1">Traits</Typography>}
        />,
        <Tab
          label={<Typography variant="subtitle1">Activity</Typography>}
          value="2"
          key="Activity"
          sx={StyledTitles}
        />,
      ];
    case "profileUser":
      return [
        <Tab
          value="1"
          key="On sale"
          sx={StyledTitles}
          label={<Typography variant="subtitle1">On sale</Typography>}
        />,
        <Tab
          label={<Typography variant="subtitle1">Owned</Typography>}
          value="2"
          key="Owned"
          sx={StyledTitles}
        />,
        <Tab
          label={<Typography variant="subtitle1">Collection</Typography>}
          value="3"
          key="Collection"
          sx={StyledTitles}
        />,
        <Tab
          label={<Typography variant="subtitle1">Settings</Typography>}
          value="4"
          key="Settings"
          sx={StyledTitles}
        />,
        <Tab
          label={<Typography variant="subtitle1">Wallet</Typography>}
          value="5"
          key="Wallet"
          sx={StyledTitles}
        />,
        <Tab
          label={<Typography variant="subtitle1">Follow</Typography>}
          value="6"
          key="Follow"
          sx={StyledTitles}
        />,
      ];
    case "profileArtist":
      return [
        <Tab
          value="1"
          key="Created"
          sx={StyledTitles}
          label={<Typography variant="subtitle1">Created</Typography>}
        />,
        <Tab
          key="OnSale"
          label={<Typography variant="subtitle1">On Sale</Typography>}
          value="2"
          sx={StyledTitles}
        />,
        <Tab
          key="Collections"
          label={<Typography variant="subtitle1">Collections</Typography>}
          value="3"
          sx={StyledTitles}
        />,
        <Tab
          key="Follow"
          label={<Typography variant="subtitle1">Follow</Typography>}
          value="4"
          sx={StyledTitles}
        />,
      ];
    case "profileCollection":
      return [
        <Tab
          value="1"
          key="Owned"
          sx={StyledTitles}
          label={<Typography variant="subtitle1">Owned</Typography>}
        />,
        <Tab
          key="OnSale"
          label={<Typography variant="subtitle1">On Sale</Typography>}
          value="2"
          sx={StyledTitles}
        />,
      ];
    default:
      return <></>;
  }
}

function SelectTabPanel(name) {
  switch (name) {
    case "perfilNft":
      return (
        <Box>
          <TabPanel
            value="1"
            sx={{ mt: { xs: "15px", sm: "20px" }, padding: 0 }}
          >
            <TabsTraits />
          </TabPanel>
          <TabPanel
            value="2"
            sx={{ mt: { xs: "15px", sm: "20px" }, padding: 0 }}
          >
            <TabsActivity />
          </TabPanel>
        </Box>
      );
    case "profileUser":
      return (
        <Box
          sx={{
            width: {
              xs: "250px",
              sm: "360px",
              md: "550px",
              lg: "750px",
              xl: "inherit",
            },
          }}
        >
          <TabPanel
            value="1"
            sx={{
              mt: { xs: "15px", sm: "20px" },
              padding: 0,
            }}
          >
            <TabsProfileUserOnSale />
          </TabPanel>
          <TabPanel
            value="2"
            sx={{ mt: { xs: "15px", sm: "20px" }, padding: 0 }}
          >
            <TabsProfileUserOwned />
          </TabPanel>
          <TabPanel
            value="3"
            sx={{ mt: { xs: "15px", sm: "20px" }, padding: 0 }}
          >
            <TabsProfileUserCollections />
          </TabPanel>
          <TabPanel
            value="4"
            sx={{ mt: { xs: "15px", sm: "20px" }, padding: 0 }}
          >
            <TabsProfileUserSettings />
          </TabPanel>
          <TabPanel
            value="5"
            sx={{ mt: { xs: "15px", sm: "20px" }, padding: 0 }}
          >
            <TabsProfileUserWallet />
          </TabPanel>
          <TabPanel
            value="6"
            sx={{ mt: { xs: "15px", sm: "20px" }, padding: 0 }}
          >
            <TabsProfileUserFollowerFollowing />
          </TabPanel>
        </Box>
      );
    case "profileArtist":
      return (
        <Box
          sx={{
            width: {
              xs: "250px",
              sm: "360px",
              md: "550px",
              lg: "750px",
              xl: "inherit",
            },
          }}
        >
          <TabPanel
            value="1"
            sx={{ mt: { xs: "15px", sm: "20px" }, padding: 0 }}
          >
            <TabsProfileArtistCreated />
          </TabPanel>
          <TabPanel
            value="2"
            sx={{
              mt: { xs: "15px", sm: "20px" },
              padding: 0,
            }}
          >
            <TabsProfileArtistOnSale />
          </TabPanel>
          <TabPanel
            value="3"
            sx={{ mt: { xs: "15px", sm: "20px" }, padding: 0 }}
          >
            <TabsProfileArtistCollections />
          </TabPanel>
          <TabPanel
            value="4"
            sx={{ mt: { xs: "15px", sm: "20px" }, padding: 0 }}
          >
            <TabsProfileArtistFollowerFollowing />
          </TabPanel>
        </Box>
      );
    case "profileCollection":
      return (
        <Box
          sx={{
            width: {
              xs: "250px",
              sm: "360px",
              md: "550px",
              lg: "750px",
              xl: "inherit",
            },
          }}
        >
          <TabPanel
            value="1"
            sx={{ mt: { xs: "15px", sm: "20px" }, padding: 0 }}
          >
            <TabsProfileCollectionOnSale />
          </TabPanel>
          <TabPanel
            value="2"
            sx={{
              mt: { xs: "15px", sm: "20px" },
              padding: 0,
            }}
          >
            <TabsProfileCollectionOwned />
          </TabPanel>
        </Box>
      );
    default:
      return <></>;
  }
}

export default function TabsGlobal(props) {
  const [value, setValue] = useState("1");
  const theme = useTheme();
  const scrollableTabs = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <TabList
        onChange={handleChange}
        variant={scrollableTabs ? "scrollable" : "standard"}
        centered={!scrollableTabs}
        allowScrollButtonsMobile
        indicatorColor="transparent"
        sx={StyledTabs}
      >
        {SelectTab(props.titlesTabs)}
      </TabList>
      {SelectTabPanel(props.titlesTabs)}
    </TabContext>
  );
}
