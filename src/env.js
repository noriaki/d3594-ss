const origins = {
  development: 'http://localhost:3000',
  staging: 'https://games-d3594-deck-stg.herokuapp.com',
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
