import {
  grayColor
} from "assets/jss/material-dashboard-react.js";

const updateProductStyle = theme => ({
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  searchTitle: {
    color: grayColor[2],
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  tableLink: {
    color: grayColor[2]
  },
  iconLink: {
    color: grayColor[0]
  },
  productImage: {
    maxWidth: "250px"
  },
  customFormControl: {
    paddingTop: "14px",
    marginTop: "0px",
    minWidth: "500px",
    [theme.breakpoints.down("xs")]: {
      minWidth: "310px",
    }
  },
  buttonContainer: {
    display: "inline-flex"
  }
});

export default updateProductStyle;
