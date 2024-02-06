const verifyRole = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ success: false, message: "You are not authorized to perform this action" });
    }

    next();
};

module.exports = verifyRole;
