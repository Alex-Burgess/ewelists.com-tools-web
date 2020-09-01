import {
  grayColor
} from "assets/jss/material-dashboard-react.js";

import checkboxAdnRadioStyle from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.js";

const createNewProductStyle = {
  ...checkboxAdnRadioStyle,
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
  tableLink: {
    color: grayColor[2]
  },
  iconLink: {
    color: grayColor[0]
  },
  productImage: {
    maxWidth: "250px"
  },
  buttonContainer: {
    marginTop: "15px"
  },
  results: {
    display: "inline-block"
  }
};

export default createNewProductStyle;
