const logger = require("./logger")

const errorHandler = (error, req, res, next) => {
    logger.info("Error name", error.name)
    if (error.code === 11000) {
        return res.status(400).json({error: "Username already in the database"})
    } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({error:"Invalid token"});
    }

    next(error);
}

const getTokenFrom = req => {
    const authorization = req.get("authorization");
    logger.info("AUTHORIZATION", authorization);
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        return authorization.substring(7);
    }
    return null;
}

const requestToken = (req, res, next) => {
    req.token = getTokenFrom(req);
    logger.info("ReqToken:", req.token);
    next();
}

module.exports = {
    errorHandler,
    requestToken
}