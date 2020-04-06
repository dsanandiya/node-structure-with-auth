import jwt from 'jsonwebtoken';

const getToken = headers => {
  if (
    headers.authorization &&
    headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return headers.authorization.split(' ')[1];
  }
  if (headers && headers.authorization) {
    return headers['authorization'];
  }
};

export const verifyToken = (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = getToken(req.headers);
  if (!token)
    return res
      .status(403)
      .send({ success: false, message: 'No token provided.' });
  // verifies secret and checks exp
  jwt.verify(token, 'h%#0^**Q52yB0y%b', (err, decoded) => {
    if (err) {
      // Try old secret
      console.log('Verified with new secret failed, trying old secret');
      jwt.verify(
        token,
        'VCAREVEHICLES:SECRET:KEY',
        (oldError, oldDecoded) => {
          if (oldError) {
            //Old secret token verification also failed
            console.log(
              'Verified with old secret also failed, now throwing error',
            );
            console.log(
              'Error in verifytoken:',
              token,
              JSON.stringify(oldError),
            );
            return res
              .status(401)
              .send({ auth: false, message: 'Unauthorized' });
          } else {
            console.log('Found using old secret: ', JSON.stringify(oldDecoded));
            // Old secret verification succeeded
            req.userId = oldDecoded.id;
            next();
          }
        },
      );
    } else {
      // New secret verification succeeded
      console.log('Found using new secret: ', JSON.stringify(decoded));
      req.userId = decoded.id;
      next();
    }
  });
};


