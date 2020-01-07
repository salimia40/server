module.exports.signup = async (req, res) => {

    var count = await User.countDocuments({ email: req.body.email.toLowerCase() || '' })
    if (count === 0) {
        var user = new User(req.body);
        user = await user.save()
        req.login(user, function (err) {

            if (err) {
                throw new Error(err);

            }
            res.send({ loggedin: true });
        });

    } else {
        res.json({ err: "A user is already registered with that email address" })
    }

}
module.exports.login = function (req, res) {
    res.json({ loggedin: true });
}

module.exports.logout = (req, res) => {
    req.logOut()
    res.json({ loggedin: false });
}
module.exports.check = (req, res) => {
    res.json({ loggedin: req.isAuthenticated() });
}
