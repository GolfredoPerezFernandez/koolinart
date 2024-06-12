import { useContext, useEffect } from "react";
import { CreateNftContext } from "@/context/CreateNft/CreateNftContext";
import { SubscriptionsContext } from "@/context/Subscriptions/SubscriptionsContext";

import { Box, ToggleButton } from "@mui/material";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";
import ModalCreateCollection from "@/components/modals/modalCreateCollection";

function StyledContainer() {
  return {
    borderRadius: "30px",
    padding: {
      xs: "8px 10px",
      sm: "12px",
      md: "10px 15px",
      lg: "18px 20px",
    },
    color: "text.primary",
    whiteSpace: "normal",
    fontSize: { xs: "10px", sm: "12px", md: "16px", lg: "16px" },
    width: { xs: "120px", md: "130px", lg: "150px" },
    height: { xs: "120px", md: "130px", lg: "150px" },
    outline: "2px solid #C02327",
    transition: "0.6s",
    "&:hover": {
      color: "text.primary",
      outline: "1px solid",
      outlineColor: "text.secondary",
      fontSize: { xs: "10.5px", sm: "12.5px", md: "16.5px", lg: "16.5px" },
      backgroundColor: "text.secondary",
    },
    "&.MuiToggleButton-root.Mui-selected": {
      color: "text.primary",
      backgroundColor: "text.secondary",
    },
  };
}

export default function SelectCollectionSlider() {
  const {
    CollectionsItems,
    CollectionsState,
    ChangeCollectionsState,
    UserRender,
  } = useBoundStore((state) => state, shallow);
  const { GetCollectionItemsCreateNft, SetCollectionFilePath } =
    useContext(CreateNftContext);
  const { SubscriptionsSelectCollections } = useContext(SubscriptionsContext);
  const handleChange = (_, collection) => {
    ChangeCollectionsState(collection);
    SetCollectionFilePath(collection);
    console.log(`Collection ${collection} `);
  };
  useEffect(() => {
    try {
      const fetchItems = async () => {
        await GetCollectionItemsCreateNft();
        await SubscriptionsSelectCollections(
          UserRender?.attributes?.ethAddress
        );
      };
      fetchItems();
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      const errorObjeto = JSON.parse(errorMessage);
      throw errorObjeto.message;
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        justifyContent: { xs: "space-between", sm: "center" },
      }}
    >
      <ModalCreateCollection />
      {CollectionsItems !== null &&
        CollectionsItems.map((value, index) => {
          return (
            <Box key={index}>
              <ToggleButton
                value={
                  value.collectionAddress
                    ? value.collectionAddress
                    : CollectionsState
                }
                selected={value.collectionAddress == CollectionsState}
                onChange={(_, value) => handleChange(_, value)}
                sx={StyledContainer}
              >
                {value.name}
              </ToggleButton>
            </Box>
          );
        })}
    </Box>
  );
}
