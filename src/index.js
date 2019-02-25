module.exports = (req, res) => {
  const { versions } = process
  res.end(`Hello from Node.js on Now 2.0! versions: ${JSON.stringify(versions, null, 2)}`);
};
