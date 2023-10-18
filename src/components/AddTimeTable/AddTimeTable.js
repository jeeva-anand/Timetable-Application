import React, { PureComponent } from "react";
import { Save } from "material-ui-icons";
import { FormGroup, FormLabel, FormControl } from "material-ui/Form";
import { createStyleSheet, withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./react-table.css";
import base from "../../re-base";
import { emptyStarterTimeTable } from "../../constants";
import Button from "material-ui/Button";

class AddTimeTable extends PureComponent {
  constructor(props) {
    super(props);

    console.log("db call");
    console.log(
      base.fetch(`teachers`, {
        context: this,
        asArray: true,
      }),
    );

    this.renderEditable = this.renderEditable.bind(this);
    this.pushTimeTableInfo = this.pushTimeTableInfo.bind(this);
    this.renderDay = this.renderDay.bind(this);

    this.state = {
      data: emptyStarterTimeTable,
      completeteTT: null,
      classInfo: "",
      semester: "",
      shift: "",
      teachers: null,
      subjects: null,
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
        Cell: this.renderEditable,
      },
      {
        Header: "07:55 - 08:55",
        accessor: "sl2",
        Cell: this.renderEditable,
      },
      {
        Header: "09:15 - 10:05",
        accessor: "sl3",
        Cell: this.renderEditable,
      },
      {
        Header: "10:10 - 11:00",
        accessor: "sl4",
        Cell: this.renderEditable,
      },
      {
        Header: "11:05 - 11:55",
        accessor: "sl5",
        Cell: this.renderEditable,
      },
      {
        Header: "12:00 - 12:50",
        accessor: "sl6",
        Cell: this.renderEditable,
      },
      {
        Header: "12:50 - 01:50",
        accessor: "sl7",
        Cell: this.renderEditable,
      },
      {
        Header: "01:50 - 02:40",
        accessor: "sl8",
        Cell: this.renderEditable,
      },
      {
        Header: "02:45 - 03:35",
        accessor: "sl9",
        Cell: this.renderEditable,
      },
      {
        Header: "03:40 - 04:30",
        accessor: "sl10",
        Cell: this.renderEditable,
      },
    ];
  }

  componentWillMount() {
    const key = this.props.location.pathname.split("/")[2];

    this.fetchAllBase();

    base
      .fetch(`timeTables/${key}`, {
        context: this,
        asArray: true,
      })
      .then((data) => {
        if (data.length !== 0) {
          this.setState({
            classInfo: data[0],
            data: data[1],
            shift: data[2],
            semester: data[3],
          });
        }
        this.forceUpdate();
      })
      .catch((error) => {
        window.console.log(error);
      });
  }

  // the supercomplex func;
  getAvailableOptions = (cellInfo, item) =>
    this.state[item]
      .map((op) => op.name)
      .map((name) =>
        this.state.completeteTT
          .map(
            (timeTable) =>
              timeTable.data[cellInfo.index][cellInfo.column.id][
                item === "teachers" ? 1 : 2
              ],
          )
          .includes(name) ? (
          <option disabled>{name}</option>
        ) : (
          <option>{name}</option>
        ),
      );

  fetchAllBase = () => {
    base
      .fetch("timeTables", {
        context: this,
        asArray: true,
      })
      .then((data) => {
        this.setState({ completeteTT: data });
      });

    base
      .fetch("teachers", {
        context: this,
        asArray: true,
      })
      .then((data) => {
        this.setState({ teachers: data });
      });

    base
      .fetch("subjects", {
        context: this,
        asArray: true,
      })
      .then((data) => {
        this.setState({ subjects: data });
      });
  };

  pushTimeTableInfo(event) {
    event.preventDefault();

    const self = this;
    const key = this.props.location.pathname.split("/")[2];

    delete this.state.completeteTT;
    delete this.state.teachers;
    delete this.state.subjects;

    base.post(`timeTables/${key || Date.now()}`, {
      data: this.state,
      then(err) {
        if (!err) {
          self.timeTableForm.reset();
          self.props.history.push("/saved");
        }
      },
    });
  }

  renderDay(cellInfo) {
    console.log(this.state.data[0]);
    return (
      <div style={{ backgroundColor: "#fafafa", padding: "50px 0" }}>
        {this.state.data[cellInfo.index][cellInfo.column.id]}
      </div>
    );
  }

  renderEditable(cellInfo) {
    return (
      <div style={{ backgroundColor: "#fafafa" }}>
        <input
          style={{ backgroundColor: "#fafafa" }}
          onChange={(e) => {
            const data = [...this.state.data];
            data[cellInfo.index][cellInfo.column.id][0] = e.target.value;
            this.setState({ data });
          }}
          value={this.state.data[cellInfo.index][cellInfo.column.id][0]}
        />

        <br />

        <select
          value={
            this.state.data[cellInfo.index][cellInfo.column.id][1] || "Not Set"
          }
          onChange={(e) => {
            const data = [...this.state.data];
            data[cellInfo.index][cellInfo.column.id][1] = e.target.value;
            this.setState({ data });
          }}
        >
          <option>Not Set</option>
          {this.getAvailableOptions(cellInfo, "teachers")}
        </select>
        <br />

        <select
          value={
            this.state.data[cellInfo.index][cellInfo.column.id][2] || "Not Set"
          }
          onChange={(e) => {
            const data = [...this.state.data];
            data[cellInfo.index][cellInfo.column.id][2] = e.target.value;
            this.setState({ data });
          }}
        >
          <option>Not Set</option>
          {this.getAvailableOptions(cellInfo, "subjects")}
        </select>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { data, classInfo, semester, shift } = this.state;

    if (
      !(this.state.completeteTT && this.state.teachers && this.state.subjects)
    ) {
      return <div>Loading..</div>;
    }

    return (
      <form
        onSubmit={this.pushTimeTableInfo}
        ref={(input) => (this.timeTableForm = input)}
        // style={{ margin: '20px 40%' }}
      >
        <div style={{ paddingLeft: "90%" }}>
          <Button
            raised
            color="primary"
            type="submit"
            className={classes.button}
          >
            <Save/>
          </Button>
        </div>

        <div className={classes.form}>
          <FormLabel htmlFor="time-table-info" style={{ textAlign: "center" }}>
            <Typography type="display2">&nbsp;TIMETABLE INFORMATION</Typography>
            <br />
          </FormLabel>

          <FormGroup id="time-table-info" style={{ margin: "20px 10%" }}>
            <FormControl>
              <TextField
                required
                id="classInfo"
                label="ClassInfo"
                onChange={(e) => this.setState({ classInfo: e.target.value })}
                className={classes.input}
                marginForm
                value={classInfo || ""}
              />

              <TextField
                required
                id="semester"
                label="Semester"
                onChange={(e) => this.setState({ semester: e.target.value })}
                className={classes.input}
                marginForm
                value={semester || ""}
              />
              <TextField
                required
                id="shift"
                label="Shift"
                onChange={(e) => this.setState({ shift: e.target.value })}
                className={classes.input}
                marginForm
                value={shift || ""}
              />
            </FormControl>
          </FormGroup>
        </div>

        <div className="table-wrap" style={{ margin: "100px" }}>
          <ReactTable
            data={data}
            columns={this.columns}
            defaultPageSize={6}
            showPageSizeOptions={false}
            showPagination={false}
          />
        </div>
      </form>
    );
  }
}

const styleSheet = createStyleSheet("AddTimeTable", (theme) => ({
  input: {
    margin: theme.spacing.unit,
  },
  form: {
    margin: 50,
  },
  button: {
    margin: 25,
  },
}));

AddTimeTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(AddTimeTable);
