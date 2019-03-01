const { readFileSync } = require('fs');
const { resolve: resolvePath } = require('path');

const origins = {
  development: 'http://localhost:3000',
  staging: 'https://games-d3594-deck-stg.herokuapp.com',
  production: 'https://deck.d3594.com',
};

const s3origins = {
  development: 'https://s3-ap-northeast-1.amazonaws.com/assets-deck.d3594.com',
  staging: 'https://s3-ap-northeast-1.amazonaws.com/assets-deck.d3594.com',
  production: 'https://assets-deck.d3594.com',
};

const getS3Options = (isDev) => {
  if (isDev) {
    return JSON.parse(readFileSync(
      resolvePath(__dirname, '../.aws-s3-creds.json')
    ));
  }
  const {
    D3594_SS_AWS_ACCESS_KEY_ID: accessKeyId,
    D3594_SS_AWS_SECRET_ACCESS_KEY: secretAccessKey,
    D3594_SS_AWS_S3_REGION: region,
  } = process.env;
  return { accessKeyId, secretAccessKey, region };
};

const getEnvKey = (isDev) => {
  if (isDev) { return 'development'; }
  if (process.env.NODE_ENV === 'production') { return 'production'; }
  return 'staging';
};

const getEnv = (isDev) => {
  const key = getEnvKey(isDev);
  const origin = origins[key];
  const s3Options = getS3Options(isDev);
  const s3origin = s3origins[key];

  return {
    origin,
    s3Options,
    s3origin,
  };
};

module.getEnv = getEnv;
module.exports = {
  getEnv,
};
