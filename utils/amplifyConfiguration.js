import { API, Auth, Amplify, Storage } from "aws-amplify";
import config from "./amplifyConfig";
export async function configure() {
  let basicConfiguration = getBasicConfiguration();
  Amplify.configure(basicConfiguration);
  Auth.configure();
  API.configure();
  Storage.configure({
    region: config.s3.REGION,
    bucket: config.s3.imageBucket,
    level: "public",
    identityPoolId: config.user.identityPoolId,
  });
  return;
}

function getBasicConfiguration() {
  var userPoolId = config.user.userPoolId;
  var userPoolWebClientId = config.user.userPoolClientId;
  var region = config.user.userPoolRegion;
  var identityPoolId = config.user.identityPoolId;

  return {
    API: {
      endpoints: config.apiGateway.URLs,
    },
    Auth: {
      identityPoolId,
      region,
      userPoolId,
      userPoolWebClientId,
      mandatorySignIn: false,
      authenticationFlowType: "USER_PASSWORD_AUTH",
    },
  };
}
