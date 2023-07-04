class AllowsRightError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AllowsRightError';
    this.statusCode = 403;
  }
}
module.exports = AllowsRightError;
