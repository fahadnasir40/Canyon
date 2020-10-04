const { User } = require('./../models/user');

const auth = (req, res, next) => {

    const roles = ["adminsitrator", "supervisor"];

    let token = req.cookies.auth;

    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({
            error: true
        });

        console.log("User Role", user.role)
        if (roles.length && !roles.includes(user.role)) {
            // user's role is not authorized
            console.log(roles.includes(user.role))
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth };