// amplifyConfig.js
const url = `https://apidev.myfamilypa.com/customer/`;
const region = "us-east-2";

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
        name: "profile",
        service: "lambda",
        region: region,
        endpoint: `${url}profile`,
      },
      {
        name: "recipients",
        service: "lambda",
        region: region,
        endpoint: `${url}recipients`,
      },
      {
        name: "billing-history",
        service: "lambda",
        region: region,
        endpoint: `${url}billing_history`,
      },
      {
        name: "subscriptions",
        service: "lambda",
        region: region,
        endpoint: `${url}subscriptions`,
      },
      {
        name: "subscription-comments",
        service: "lambda",
        region: region,
        endpoint: `${url}subscription_comments`,
      },
      {
        name: "quotes",
        service: "lambda",
        region: region,
        endpoint: `${url}quotes`,
      },
      {
        name: "quote-comments",
        service: "lambda",
        region: region,
        endpoint: `${url}quote_comments`,
      },
      {
        name: "quote-stripe",
        service: "lambda",
        region: region,
        endpoint: `${url}quote_stripe`,
      },
      {
        name: "quote_secret",
        service: "lambda",
        region: region,
        endpoint: `${url}quote_secret`,
      },
      {
        name: "billing_secret",
        service: "lambda",
        region: region,
        endpoint: `${url}billing_secret`,
      },
      {
        name: "subscription-stripe",
        service: "lambda",
        region: region,
        endpoint: `${url}subscription_stripe`,
      },
      {
        name: "services",
        service: "lambda",
        region: region,
        endpoint: `${url}services`,
      },
      {
        name: "home",
        service: "lambda",
        region: region,
        endpoint: `${url}home`,
      },
      {
        name: "business",
        service: "lambda",
        region: region,
        endpoint: `${url}business`,
      },
    ],
  },
};

export default config;
