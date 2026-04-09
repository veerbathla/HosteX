const buckets = new Map();

export const createRateLimiter = ({
    windowMs = 15 * 60 * 1000,
    max = 20,
    message = "Too many requests. Please try again later.",
} = {}) => {
    return (req, res, next) => {
        const key = `${req.ip}:${req.body?.email || ""}:${req.originalUrl}`;
        const now = Date.now();
        const bucket = buckets.get(key) || { count: 0, resetAt: now + windowMs };

        if (bucket.resetAt <= now) {
            bucket.count = 0;
            bucket.resetAt = now + windowMs;
        }

        bucket.count += 1;
        buckets.set(key, bucket);

        if (bucket.count > max) {
            return res.status(429).json({
                success: false,
                message,
                data: null,
            });
        }

        return next();
    };
};

export const authRateLimiter = createRateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many authentication attempts. Please wait and try again.",
});
