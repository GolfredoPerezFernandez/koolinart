import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Typography, Box } from "@mui/material";
import Nfts from "@/components/tabs/tabNavigation/tabsExploreNfts";
import Colletions from "@/components/tabs/tabNavigation/tabsExploreCollections";
import User from "@/components/tabs/tabNavigation/tabsExploreUser";

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

function SelectTab(name) {
  switch (name) {
    case "Explore":
      return [
        <Tab
          value="1"
          key="Nfts"
          sx={StyledTitles}
          label={<Typography variant="subtitle1">Nfts</Typography>}
        />,

        <Tab
          label={<Typography variant="subtitle1">Collections</Typography>}
          value="2"
          key="Collections"
          sx={StyledTitles}
        />,
        <Tab
          label={<Typography variant="subtitle1">User</Typography>}
          value="3"
          key="User"
          sx={StyledTitles}
        />,
      ];
    default:
      return <></>;
  }
}

function SelectTabPanel(name) {
  switch (name) {
    case "Explore":
      return (
        <Box>
          <TabPanel
            value="1"
            sx={{ mt: { xs: "15px", sm: "20px" }, padding: 0 }}
          >
            <Nfts />
          </TabPanel>

          <TabPanel
            value="2"
            sx={{ mt: { xs: "15px", sm: "20px" }, padding: 0 }}
          >
            <Colletions />
          </TabPanel>
          <TabPanel
            value="3"
            sx={{ mt: { xs: "15px", sm: "20px" }, padding: 0 }}
          >
            <User />
          </TabPanel>
        </Box>
      );
    default:
      return <></>;
  }
}

export default function TabsExplore(props) {
  const [value, setValue] = useState("1");

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <TabList
        onChange={handleChange}
        aria-label="lab API tabs example"
        scrollButtons
        allowScrollButtonsMobile
        indicatorColor="transparent"
        sx={{
          width: "100%",
        }}
      >
        {SelectTab(props.titlesTabs)}
      </TabList>
      {SelectTabPanel(props.titlesTabs)}
    </TabContext>
  );
}
