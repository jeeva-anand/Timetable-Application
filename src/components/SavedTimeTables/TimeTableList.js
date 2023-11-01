import List, { ListItem } from "material-ui/List";
import Typography from "material-ui/Typography";
import PropTypes from "prop-types";
import React, { Component } from "react";

class TimeTablelList extends Component {
  render() {
    const { data, clickHandler } = this.props;
    if (Object.keys(data[0]).length === 0) {
      return (
        <List>
          <ListItem button>No Timetables Saved</ListItem>
        </List>
      );
    }

    return (
      <div style={{ display: "grid", columns: 4, gridAutoColumns: "auto", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
        {data.map(
          (item, index) => (

            <ListItem key={index} style={{ border: "1px solid lightgrey", borderRadius: 4, margin: 8, display: "block" }} button onClick={clickHandler.bind(this, index)}>
              <Typography type="body2">{item.classInfo}</Typography>
              <Typography type="body1">{item.shift} Shift</Typography>
              <Typography type="body1">{item.semester} Semester</Typography>
            </ListItem>

          ),
          this,
        )}
      </div>
    );
  }
}

TimeTablelList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TimeTablelList;
