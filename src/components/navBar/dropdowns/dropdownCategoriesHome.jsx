import * as React from "react";
import { Menu, MenuItem, Typography, Button } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function StyledMenuItems() {
  return {
    justifyContent: "center",
    ":hover": {
      backgroundColor: "transparent",
    },
  };
}

function StyledIcon() {
  return {
    color: "secondary.icon",
    fontSize: "25px",
    transition: "0.3s",
    ":hover": {
      color: "#C02327",
    },
  };
}

export default function DropdownMenuHome(props) {
  let navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlevNavigation = (to) => {
    navigate(`/${to}`);
    setAnchorEl(null);
  };
  function StyledItemTypography(title) {
    return {
      color: location.pathname === title ? "text.primary" : "text.secondary",
      cursor: "pointer",
      transition: "0.3s",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0)",
        color: "text.primary",
        fontWeight: "500",
      },
    };
  }
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDown sx={StyledIcon} />}
      >
        <Typography variant="body1" sx={StyledItemTypography()}>
          {props.title}
        </Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ pb: "100px" }}
      >
        <MenuItem
          onClick={() => handlevNavigation("artists")}
          sx={StyledMenuItems}
        >
          <Typography variant="body1" sx={StyledItemTypography(`/artists`)}>
            Artists
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => handlevNavigation("Nfts")}
          sx={StyledMenuItems}
        >
          <Typography variant="body1" sx={StyledItemTypography("/Nfts")}>
            NFT
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => handlevNavigation("collections")}
          sx={StyledMenuItems}
        >
          <Typography variant="body1" sx={StyledItemTypography("/collections")}>
            Collections
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => handlevNavigation("certificate-movement")}
          sx={StyledMenuItems}
        >
          <Typography
            variant="body1"
            sx={StyledItemTypography("certificate-movement")}
          >
            Movement Certificates
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
