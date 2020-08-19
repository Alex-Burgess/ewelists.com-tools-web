import {
  title,
  whiteColor
} from "assets/jss/material-dashboard-react.js";

const style = theme => ({
  title: {
    ...title,
    color: "#577590",
    fontWeight: "500"
  },
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fafafa",
    [theme.breakpoints.down("xs")]: {
      backgroundColor: whiteColor
    }
  },
  textCenter: {
    textAlign: "center"
  },
  cardLogin: {
    maxWidth: "80%",
    minWidth: "450px",
    marginTop: "120px",
    paddingBottom: "20px",
    border: "1px solid #ddd",
    boxShadow: "none",
    [theme.breakpoints.down("xs")]: {
      border: "none",
      marginTop: "70px",
      maxWidth: "100%",
      minWidth: "300px",
    }
  },
  logo: {
    paddingTop: "60px",
    textAlign: "center"
  },
  logoImg: {
    maxWidth: "110px"
  }
});

export default style;
