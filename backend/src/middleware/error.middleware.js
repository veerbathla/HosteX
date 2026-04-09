//clean response instead of crashing app
export const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV !== "test") {
        console.error(err.message || err);
    }
    const statusCode = err.statusCode || err.status || 500;
    res.status(statusCode).json({
        success: false,
        message:
            statusCode === 500
                ? "Internal server error"
                : err.message || "Request failed",
        data: null,
    });
}
