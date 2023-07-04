class UniqueEmailError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UniqueEmailError';
    this.statusCode = 409;
  }
}
module.exports = UniqueEmailError;
