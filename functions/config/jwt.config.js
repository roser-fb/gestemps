const secretKey = '1312@JaNoEnsAlimentenLesMolles@:@AraVolemElPaSencer@1312';
module.exports = secretKey;

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined' && bearerHeader.startsWith('Bearer ')) {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).json({ status: 'error', message: 'Token de autorización no válido' });
  }
}
module.exports = verifyToken;