export function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
}
