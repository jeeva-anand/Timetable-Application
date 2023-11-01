import AppBar from "material-ui/AppBar";
import Button from "material-ui/Button";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import { createStyleSheet, withStyles } from "material-ui/styles";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
// import IconButton from 'material-ui/IconButton';
import { AccessTime } from "material-ui-icons";
import Home from "material-ui-icons/Home";
import colors from "./../../colors";

const styleSheet = createStyleSheet("Header", {
  header: {
    backgroundColor: colors.secondaryDarkest,
  },
  icon: {
    height: 27,
    width: 27,
    color: colors.secondaryLighter,
  },
  time: {
    height: 23,
    width: 23,
  },
  root: {
    width: "100%",
  },
  bar: {
    height: 70,
  },
  title: {
    flex: 1,
    paddingTop: 8,
    fontSize: 31,
    fontWeight: 400,
    letterSpacing: 1.4,
  },
  settings: {
    color: colors.secondaryLighter,
    fontSize: 19,
    textTransform: "capitalize",
  },
});

function Header(props) {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.bar}>
          <Link
            to={`${process.env.PUBLIC_URL}/`}
            style={{ textDecoration: "none" }}
          >
            <Button>
              <Home className={classes.icon} aria-label="home" />
              <Typography type="caption" className={classes.settings}>
                &nbsp;Home
              </Typography>
            </Button>
          </Link>

          <Typography
            color="inherit"
            className={classes.title}
            gutterBottom
            align="center"
          >
            <AccessTime className={classes.time} />
            &nbsp;Time Table Generator
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Header);
