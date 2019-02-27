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

const getEnvKey = (isDev) => {
  if (isDev) { return 'development'; }
  if (process.env.NODE_ENV === 'production') { return 'production'; }
  return 'staging';
};

const getEnv = (isDev) => {
  const key = getEnvKey(isDev);
  const origin = origins[key];
  const s3origin = s3origins[key];

  return {
    origin,
    s3origin,
  };
};

module.getEnv = getEnv;
module.exports = {
  getEnv,
};
