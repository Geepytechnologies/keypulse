// amplifyConfig.js
const config = {
  s3: {
    REGION: "us-east-2",
    imageBucket: "myfamilypa-static-content-dev",
  },
  user: {
    userPoolId: "us-east-2_2DBVzE7eC",
    userPoolClientId: "7sh7ttcr5ta3o01o3ik2b1h41b",
    userPoolRegion: "us-east-2",
    identityPoolId: "us-east-2:0f3c4c84-9b4e-4b92-9b54-94db4a3db18e",
  },
  apiGateway: {
    URLs: [
      {
        name: "YourAPIName",
        endpoint: "https://your-api-endpoint",
      },
    ],
  },
};

export default config;
