import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Typography, Box } from "@mui/material";
import TabsNavigationCreateNft from "@/components/tabs/tabNavigation/tabsCreateNft";

function StyledTitles() {
  return {
    color: "text.secondary",
    opacity: "0.8",
    textTransform: "capitalize",
    "&.Mui-selected": {
      color: "text.secondary",
      opacity: "1",
    },
  };
}
export default function TabsCreateNft(props) {
  const [value, setValue] = useState("1");
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  return (
    <TabContext value={value}>
      <TabList
        onChange={handleChange}
        allowScrollButtonsMobile
        indicatorColor="transparent"
        centered
        sx={{
          border: "3px solid #C02327",
          borderRadius: "10px",
          width: "100%",
          height: "fit-content",
        }}
      >
        <Tab
          value="1"
          key="ERC-721"
          sx={StyledTitles}
          label={<Typography variant="subtitle1">ERC-721</Typography>}
        />
      </TabList>
      <Box>
        <TabPanel value="1" sx={{ mt: { xs: "15px", sm: "20px" }, padding: 0 }}>
          <TabsNavigationCreateNft />
        </TabPanel>
      </Box>
    </TabContext>
  );
}
