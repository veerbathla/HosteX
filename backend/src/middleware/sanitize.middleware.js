const sensitiveKeys = new Set([
    "password",
    "confirmpassword",
    "currentpassword",
    "newpassword",
]);

const sanitizeString = (value) =>
    value
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/[<>]/g, "")
        .trim();

const sanitizeValue = (value, key = "") => {
    if (typeof value === "string") {
        return sensitiveKeys.has(String(key).toLowerCase())
            ? value
            : sanitizeString(value);
    }
    if (Array.isArray(value)) return value.map((item) => sanitizeValue(item, key));
    if (value && typeof value === "object") {
        return Object.fromEntries(
            Object.entries(value).map(([key, nestedValue]) => [
                key,
                sanitizeValue(nestedValue, key),
            ]),
        );
    }
    return value;
};

const mutateSanitizedObject = (target) => {
    const sanitized = sanitizeValue(target);
    Object.keys(target).forEach((key) => delete target[key]);
    Object.assign(target, sanitized);
};

export const sanitizeRequest = (req, res, next) => {
    if (req.body) req.body = sanitizeValue(req.body);
    if (req.query) mutateSanitizedObject(req.query);
    if (req.params) mutateSanitizedObject(req.params);
    return next();
};
