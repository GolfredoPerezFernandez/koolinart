import ButtonPrimary from "@/components/buttons/buttonPrimary";
import InputSearchGlobals from "@/components/inputs/inputSearchGlobal";
import DropdownMenuHome from "@/components/navBar/dropdowns/dropdownCategoriesHome";
import ItemsNav from "@/components/navBar/itemsNav";
import SideBarUser from "@/components/navBar/sideBarUser";
import Sidebar from "@/components/navBar/sidebar";
import { AppBar, Box, CardMedia, Toolbar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { InputsSearchContext } from "@/context/InputsSearch/InputsSearchContext";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";

const Navbar = () => {
  let navigate = useNavigate();
  const { ThemeModeState, ChangeMode, Authenticated } = useBoundStore(
    (state) => state,
    shallow
  );
  const { FilterCoincidenceHome } = useBoundStore((state) => state, shallow);
  const { GetFilterCoincidenceHome } = useContext(InputsSearchContext);

  let logotipo_koolinart_v1 =
    "https://ipfs.moralis.io:2053/ipfs/QmciCp2vBFZz3Hh9GuKBQdWdgvsS3DMUNMdMdsVzZ6r2US/0xE568887Bf75AeA78147730CC4101aDf09626759E/logotipo_koolinart_v1.svg";

  let imagotipo_koolinart_v1 =
    "https://ipfs.moralis.io:2053/ipfs/QmcJDXFQp97Pq88ApEaKhLVMVHqKGfMgEHuX4J3xP6J7R3/0xE568887Bf75AeA78147730CC4101aDf09626759E/imagotipo_koolinart_v1.svg";

  let ThemeKoolinart =
    "https://ipfs.moralis.io:2053/ipfs/QmWnYBFKdXQmGV5STi63mG8t5hYSdMeZiwACSamma5H2jj/0xE568887Bf75AeA78147730CC4101aDf09626759E/ThemeKoolinart.svg";

  function LogoImage() {
    return (
      <>
        <CardMedia
          component="img"
          image={logotipo_koolinart_v1}
          alt="Logo"
          sx={{
            display: { xs: "none", sm: "flex" },
            width: { xs: "120px", md: "189px" },
            height: "55px",
            margin: "auto",
            objectFit: "contain",
          }}
        />
        <CardMedia
          component="img"
          image={imagotipo_koolinart_v1}
          alt="Logo"
          sx={{
            display: { xs: "flex", sm: "none" },
            width: { xs: "40px", md: "189px" },
            height: "30px",
            margin: "auto",
            objectFit: "contain",
          }}
        />
      </>
    );
  }
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundImage: "none",
        backgroundColor: "background.paper",
        width: "100%",
        boxShadow: "none",
        display: "flex",
        alignItems: "center",
        borderRadius: "0px",
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          m: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: "10px", md: "20px", lg: "30px" },
          }}
        >
          <LogoImage />
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              width: { xs: "100px", md: "170px", lg: "200px" },
            }}
          >
            <InputSearchGlobals
              title="Search Nfts"
              filterOptions={FilterCoincidenceHome}
              GetFilterGlobal={GetFilterCoincidenceHome}
              goTo={true}
            />
          </Box>
        </Box>
        <Box>
          <Tooltip
            title={ThemeModeState === "light" ? "Dark mode" : "Light mode"}
            followCursor
          >
            <CardMedia
              component="img"
              image={ThemeKoolinart}
              alt="Logo"
              sx={{
                height: "40px",
                objectFit: "contain",
                width: "fit-content",
                cursor: "pointer",
                filter: `drop-shadow(${
                  ThemeModeState === "light"
                    ? `0px 1.5px rgba(0,0,0,0.9)`
                    : `0px 0.5px rgba(255,255,255,0.9)`
                })`,
              }}
              onClick={() => {
                ChangeMode(ThemeModeState);
              }}
            />
          </Tooltip>
        </Box>
        <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <ItemsNav to="/">Home</ItemsNav>
            <ItemsNav to="/explore">Explore</ItemsNav>
            <ItemsNav to="/activity">Activity</ItemsNav>
            <DropdownMenuHome title="Community" />
          </Box>
          {Authenticated ? (
            <SideBarUser />
          ) : (
            <ButtonPrimary
              onClick={() => {
                navigate(`/sign-in`);
              }}
              width="auto"
            >
              Authenticate
            </ButtonPrimary>
          )}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Sidebar />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
