const verifyRole = (req, res, next) => {
    const role = req.cookies.auth;

    console.log("Role:", role);
    console.log(req.cookies);

    if (role !== "admin") {
        return res.status(403).json({ success: false, message: "You are not authorized to access this route" });
    }

    console.log("Role:", role);

    next();
};

module.exports = verifyRole;
