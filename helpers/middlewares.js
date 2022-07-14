const isAuth = (req, res, next) => {
    if (req.session?.user) return next();
    return res.redirect('/');
}

const notAuth = (req, res, next) => {
    if (!req.session?.user) return next();
    return res.redirect('/');
}

const goLogin = (req, res, next) => {
    if (req.session?.user) return next();
    return res.redirect('/usuario/login');
}
module.exports = { isAuth, notAuth, goLogin };