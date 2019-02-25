const origins = {
  development: 'http://localhost:3000',
  staging: 'https://deck-stg.d3594.com',
  production: 'https://deck.d3594.com',
};

const getEnvKey = (isDev) => {
  if (isDev) { return 'development'; }
  if (process.env.NODE_ENV === 'production') { return 'production'; }
  return 'staging';
};

const getEnv = (isDev) => {
  const key = getEnvKey(isDev);
  const origin = origins[key];

  return {
    origin,
  };
};

module.getEnv = getEnv;
module.exports = {
  getEnv,
};
