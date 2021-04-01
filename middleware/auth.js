const jwt = require('jsonwebtoken');
const config = require('config');
const ls = require('local-storage');

module.exports = function ( req, res, next) {
    const token = ls.get('token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try { 
        req.user = jwt.verify(token, config.get('SecretKey'));
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token.');
    }
}