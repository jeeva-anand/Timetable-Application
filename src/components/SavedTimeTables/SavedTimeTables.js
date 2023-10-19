import CloseIcon from "material-ui-icons/Close";
import AppBar from "material-ui/AppBar";
import Button from "material-ui/Button";
import Dialog from "material-ui/Dialog";
import Grid from "material-ui/Grid";
import IconButton from "material-ui/IconButton";
import Paper from "material-ui/Paper";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import { createStyleSheet, withStyles } from "material-ui/styles";
import Slide from "material-ui/transitions/Slide";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import base from "../../re-base";
import colors from "./../../colors";
import "./../AddTimeTable/react-table.css";
import TimeTablelList from "./TimeTableList";

class SavedTimeTables extends Component {
  constructor() {
    super();

    this.fetchTimeTables = this.fetchTimeTables.bind(this);
    this.dialogOpen = this.dialogOpen.bind(this);
    this.dialogClose = this.dialogClose.bind(this);
    this.renderCells = this.renderCells.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.renderDay = this.renderDay.bind(this);

    this.state = {
      data: [{}],
      dialogOpen: false,
      index: 0,
    };

    this.columns = [
      {
        Header: "Day/Time",
        accessor: "sl0",
        Cell: this.renderDay,
      },
      {
        Header: "07:00 - 07:45",
        accessor: "sl1",
        Cell: this.renderCells,
      },
      {
        Header: "07:55 - 08:55",
        accessor: "sl2",
        Cell: this.renderCells,
      },
      {
        Header: "09:15 - 10:05",
        accessor: "sl3",
        Cell: this.renderCells,
      },
      {
        Header: "10:10 - 11:00",
        accessor: "sl4",
        Cell: this.renderCells,
      },
      {
        Header: "11:05 - 11:55",
        accessor: "sl5",
        Cell: this.renderCells,
      },
      {
        Header: "12:00 - 12:50",
        accessor: "sl6",
        Cell: this.renderCells,
      },
      {
        Header: "12:50 - 01:50",
        accessor: "sl7",
        Cell: this.renderCells,
      },
      {
        Header: "01:50 - 02:40",
        accessor: "sl8",
        Cell: this.renderCells,
      },
      {
        Header: "02:45 - 03:35",
        accessor: "sl9",
        Cell: this.renderCells,
      },
      {
        Header: "03:40 - 04:30",
        accessor: "sl10",
        Cell: this.renderCells,
      },
    ];
  }

  componentWillMount() {
    this.fetchTimeTables();
  }

  renderDay(cellInfo) {
    const { data, index } = this.state;
    return (
      <Typography style={{ backgroundColor: "#fafafa", padding: "24px 0" }}>
        {data[index].data[cellInfo.index][cellInfo.column.id]}
      </Typography>
    );
  }

  fetchTimeTables() {
    base
      .fetch("timeTables", {
        context: this,
        asArray: true,
      })
      .then((data) => {
        this.setState({ data });
      })
      .catch((error) => {
        window.console.log(error);
      });
  }

  dialogOpen(index) {
    this.setState({ dialogOpen: true, index });
  }

  dialogClose() {
    this.setState({ dialogOpen: false });
  }

  edit() {
    const { data, index } = this.state;

    this.props.history.push(`/addnew/${data[index].key}`);
  }

  delete() {
    const { data, index } = this.state;
    base
      .remove(`timeTables/${data[index].key}`)
      .then(() => {
        this.dialogClose();
        this.props.history.push("/saved");
        this.forceUpdate();
        this.render();
      })
      .catch((error) => {
        window.console.log(error);
      });
  }

  renderCells(cellInfo) {
    const { data, index } = this.state;
    return (
      <div style={{ backgroundColor: "#fafafa" }}>
        <Typography type="body2">
          {data[index].data[cellInfo.index][cellInfo.column.id][2] || "No Subject"}
        </Typography>
        <br />
        <Typography type="body1">
          {data[index].data[cellInfo.index][cellInfo.column.id][1] || "No Teacher"}
        </Typography>
        <br />
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { data, dialogOpen, index } = this.state;

    return (
      <Grid container className={classes.container}>
        <Grid item>
          <Typography type="title" className={classes.title}>
            Saved Time Tables
          </Typography>
          <div>
            <TimeTablelList data={data} clickHandler={this.dialogOpen} />

            <Dialog
              fullScreen
              open={dialogOpen}
              transition={<Slide direction="up" />}
              onRequestClose={this.dialogClose}
            >
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    color="contrast"
                    onClick={this.dialogClose}
                    aria-label="Close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <div className={classes.flex} />
                  <Button
                    raised
                    color="primary"
                    className={classes.button}
                    onClick={this.edit}
                  >
                    <Typography type="caption" className={classes.settings}>
                      &nbsp;Edit
                    </Typography>
                  </Button>
                  <Button
                    raised
                    color="accent"
                    className={classes.button}
                    onClick={this.delete}
                  >
                    <Typography type="caption" className={classes.settings}>
                      &nbsp;Delete
                    </Typography>
                  </Button>
                </Toolbar>
              </AppBar>

              <Paper
                style={{ margin: "24px", padding: "24px" }}
                elevation={2}
                square
              >
                <Typography type="title">
                  Class:
                  <span className={classes.ttinfo}>
                    {" "}
                    {data[index].classInfo}
                  </span>
                  Semester:
                  <span className={classes.ttinfo}>
                    {" "}
                    {data[index].semester}
                  </span>
                  Shift:
                  <span className={classes.ttinfo}>
                    {" "}
                    {data[index].shift}
                  </span>
                </Typography>
              </Paper>

              <div
                className={classes.tableWrap}
                style={{ margin: "24px 10%" }}
              >
                <ReactTable
                  data={data[index].data}
                  columns={this.columns}
                  defaultPageSize={6}
                  showPageSizeOptions={false}
                  showPagination={false}
                />
              </div>
            </Dialog>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const styleSheet = createStyleSheet("SavedTimeTables", (theme) => ({
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  appBar: {
    position: "relative",
    backgroundColor: colors.primaryDark,
  },
  flex: {
    flex: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  settings: {
    color: colors.secondaryLighter,
    fontSize: 19,
    textTransform: "capitalize",
  },
  ttinfo: {
    color: "grey",
    paddingRight: "250px",
  },
  tableWrap: {
    MsOverflowStyle: "none", /* IE and Edge */
    scrollbarWidth: "none", /* Firefox */
    overflowY: "scroll",
  }
}));

SavedTimeTables.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styleSheet)(SavedTimeTables));
