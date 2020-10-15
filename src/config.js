const test = {
  apiGateway: {
    REGION: "eu-west-1",
    TOOLS: "https://b7mk5vs6r1.execute-api.eu-west-1.amazonaws.com/test/tools"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_yec0GzMyD",
    APP_CLIENT_ID: "5qi07g3hls0jcn7fhrmkeoalnn",
    IDENTITY_POOL_ID: "eu-west-1:6d7c2341-d418-491e-9a48-8365be5febd8"
  },
  mainSiteDomain: "https://test.ewelists.com",
  toolsSiteDomain: "https://test.tools.ewelists.com"
};

const staging = {
  apiGateway: {
    REGION: "eu-west-1",
    TOOLS: "https://krjgxt13qb.execute-api.eu-west-1.amazonaws.com/staging/tools"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_m02XYmJZ9",
    APP_CLIENT_ID: "qi2g0bu56ll4pbum6tnaemdv0",
    IDENTITY_POOL_ID: "eu-west-1:45ca1b74-5bbc-4713-a153-5e920d7793cc"
  },
  mainSiteDomain: "https://staging.ewelists.com",
  toolsSiteDomain: "https://staging.tools.ewelists.com"
};

const prod = {
  apiGateway: {
    REGION: "eu-west-1",
    TOOLS: "https://thv9i4h952.execute-api.eu-west-1.amazonaws.com/prod/tools"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_pF22dcp03",
    APP_CLIENT_ID: "2sj4rs9g2oejdja0lcfi7n9s1j",
    IDENTITY_POOL_ID: "eu-west-1:22bc560f-7bb7-4381-94df-5cf865addaaa"
  },
  mainSiteDomain: "https://ewelists.com",
  toolsSiteDomain: "https://tools.ewelists.com"
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
    config['mainSiteDomain'] = "http://localhost:3000";
    config['toolsSiteDomain'] = "http://localhost:3000";
    break;
}

export default {
  ...config
};
