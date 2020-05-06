import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import cx from "classnames";
import { SideDrawer } from "./SideDrawer/SideDrawer.jsx";

import styles from "./NavBar.module.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const NavBar = ({ handleDarkMode }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mode, setMode] = React.useState("Dark");
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSource = () => {
    window.location.replace("https://github.com/mathdroid/covid-19-api");
  };
  const handleDarkClick = () => {
    handleClose();
    handleDarkMode();
    mode === "Light" ? setMode("Dark") : setMode("Light");
  };

  return (
    <div className={cx(classes.root, styles)}>
      <AppBar position="static">
        <Toolbar>
          <SideDrawer />
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            COVID-19 Tracker
          </Typography>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
          >
            Settings
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Suggest Us</MenuItem>
            <MenuItem onClick={handleSource}>Sources</MenuItem>
            <MenuItem onClick={handleClose}>Switch API</MenuItem>
            <MenuItem onClick={handleDarkClick}>{mode} Theme</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
