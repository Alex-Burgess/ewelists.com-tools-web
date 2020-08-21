const test = {
  apiGateway: {
    REGION: "eu-west-1",
    TOOLS: "https://fi04ss055h.execute-api.eu-west-1.amazonaws.com/test/tools",
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_yVCCvB63n",
    APP_CLIENT_ID: "6mdl2r47f7nl2tso37409fo85r",
    IDENTITY_POOL_ID: "eu-west-1:b57e40f6-6a69-4dbb-9576-058b13dd5caa"
  }
};

const staging = {
  apiGateway: {
    REGION: "eu-west-1",
    TOOLS: "https://fgkx791rd5.execute-api.eu-west-1.amazonaws.com/test/tools",
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_DxVdItnPF",
    APP_CLIENT_ID: "61jc00sq2iv9ftgodo1cv9in0c",
    IDENTITY_POOL_ID: "eu-west-1:bcdb7f2e-b7ef-4249-9909-05ae18ee328d"
  }
};

const prod = {
  apiGateway: {
    REGION: "eu-west-1",
    TOOLS: "https://thv9i4h952.execute-api.eu-west-1.amazonaws.com/test/tools",
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "",
    APP_CLIENT_ID: "",
    IDENTITY_POOL_ID: ""
  }
};

var config;
switch (process.env.REACT_APP_STAGE) {
  case "prod":
    console.log("Config: prod");
    config = prod;
    config['environment'] = "prod";
    break;
  case "staging":
    console.log("Config: staging");
    config = staging;
    config['environment'] = "staging";
    break;
  case "test":
    console.log("Config: test");
    config = test;
    config['environment'] = "test";
    break;
  default:
    console.log("Config: test (localhost)");
    config = test;
    config['environment'] = "test";
    config['rootDomain'] = "http://localhost:3000";
    break;
}

export default {
  ...config
};
