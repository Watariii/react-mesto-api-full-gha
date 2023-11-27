const allowedCorsOrigin = [
  'https://api.mesto-react.sukhov-nikita.ru',
  'http://api.mesto-react.sukhov-nikita.ru',
  'https://mesto-react.sukhov-nikita.ru',
  'http://mesto-react.sukhov-nikita.ru',
  'http://localhost:3001',
  'http://localhost:3000',

];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

// eslint-disable-next-line consistent-return
const allowedCors = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCorsOrigin.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
};

module.exports = allowedCors;
