import * as React from "react";
import { Button, Menu, MenuItem, Grid, Box } from "@mui/material";
import {
  Share,
  Twitter,
  Facebook,
  Telegram,
  Email,
  Link,
  Pinterest,
  Reddit,
  WhatsApp,
} from "@mui/icons-material";

import {
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
  TelegramShareButton,
  EmailShareButton,
  WhatsappShareButton,
  PinterestShareButton,
} from "react-share";

function ButtonStyles() {
  return {
    padding: { xs: "5px", sm: "8px", md: "10px" },
    boxShadow:
      "0px 10px 10px rgba(0, 0, 0, 0.02), 0px 1.7776px 3.4221px rgba(0, 0, 0, 0.115017), 0px 2.3363px 17.869px rgba(0, 0, 0, 0.0953772), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.08), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0646228), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0449833)",
  };
}
function GridItemStyle() {
  return {
    backgroundColor: "background.default",
    display: "flex",
    justifyContent: "center ",
    alignContent: "center",
    borderRadius: "10px",
  };
}
function StyledIcon() {
  return {
    display: "flex",
    height: "100%",
    padding: "8px",
  };
}
function StyledIconButton() {
  return {
    fontSize: { xs: "30px", sm: "40px", md: "45px" },
    color: "secondary.shared",
    transition: "0.6s",
    "&:hover": {
      color: "secondary.main",
    },
  };
}
export default function ButtonShare(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElSecondary, setAnchorElSecondary] = React.useState(null);
  const open = Boolean(anchorEl);
  const openSecondary = Boolean(anchorElSecondary);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickSecondary = (event) => {
    setAnchorElSecondary(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseSecondary = () => {
    setAnchorElSecondary(null);
  };
  const shareUrl = props.myShareUrl; // insert the URL you want to share here
  const mediaShareUrl = "http://path-to-your/image.jpg";
  return (
    <Button sx={ButtonStyles}>
      <Share
        sx={StyledIconButton}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ mt: 1 }}
      >
        <MenuItem
          sx={{
            "&:hover": {
              backgroundColor: "initial", // change to desired color
            },
            color: "text.secondary",
            justifyContent: "center",
          }}
        >
          Share link
        </MenuItem>
        <MenuItem
          sx={{
            "&:hover": {
              backgroundColor: "initial", // change to desired color
            },
          }}
        >
          <Grid container spacing={1}>
            <Grid item onClick={handleClose}>
              <Box sx={GridItemStyle()}>
                <TwitterShareButton url={shareUrl} style={StyledIcon()}>
                  <Twitter size={32} />
                </TwitterShareButton>
              </Box>
            </Grid>
            <Grid item onClick={handleClose}>
              <Box sx={GridItemStyle()}>
                <FacebookShareButton url={shareUrl} style={StyledIcon()}>
                  <Facebook size={32} />
                </FacebookShareButton>
              </Box>
            </Grid>
            <Grid item onClick={handleClose}>
              <Box sx={GridItemStyle()}>
                <TelegramShareButton url={shareUrl} style={StyledIcon()}>
                  <Telegram size={32} />
                </TelegramShareButton>
              </Box>
            </Grid>
            <Grid item onClick={handleClose}>
              <Box sx={GridItemStyle()}>
                <EmailShareButton url={shareUrl} style={StyledIcon()}>
                  <Email size={32} />
                </EmailShareButton>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={GridItemStyle()}>
                <Box style={StyledIcon()}>
                  <Link
                    size={32}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClickSecondary}
                  />
                </Box>
              </Box>
              <Menu
                id="basic-menu"
                anchorEl={anchorElSecondary}
                open={openSecondary}
                onClose={handleCloseSecondary}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                sx={{ mt: 3 }}
              >
                <MenuItem
                  sx={{
                    "&:hover": {
                      backgroundColor: "initial", // change to desired color
                    },
                    color: "text.secondary",
                    justifyContent: "center",
                  }}
                >
                  Share link
                </MenuItem>
                <MenuItem
                  sx={{
                    "&:hover": {
                      backgroundColor: "initial", // change to desired color
                    },
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid
                      item
                      onClick={() => {
                        handleClose(), handleCloseSecondary();
                      }}
                    >
                      <Box sx={GridItemStyle()}>
                        <RedditShareButton url={shareUrl} style={StyledIcon()}>
                          <Reddit size={32} />
                        </RedditShareButton>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      onClick={() => {
                        handleClose(), handleCloseSecondary();
                      }}
                    >
                      <Box sx={GridItemStyle()}>
                        <WhatsappShareButton
                          url={shareUrl}
                          style={StyledIcon()}
                        >
                          <WhatsApp size={32} />
                        </WhatsappShareButton>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      onClick={() => {
                        handleClose(), handleCloseSecondary();
                      }}
                    >
                      <Box sx={GridItemStyle()}>
                        <PinterestShareButton
                          url={shareUrl}
                          media={mediaShareUrl} // insert the URL of the media you want to share
                          // insert the URL of the media you want to share
                          style={StyledIcon()}
                        >
                          <Pinterest size={32} />
                        </PinterestShareButton>
                      </Box>
                    </Grid>
                  </Grid>
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </MenuItem>
      </Menu>
    </Button>
  );
}
