// responseFormatter.js
export function responseFormatter(req, res, next) {
    res.sendSuccess = (status, data, message) => {
        res.status(status).json({
            success: true,
            message,
            data
        });
    };

    res.sendError = (status, data, message) => {
        res.status(status).json({
            success: false,
            message,
            data
        });
    };

    next();
}

