import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// Routes
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import hostelRoutes from "./routes/hostel.routes.js";
import maintenanceRoutes from "./routes/maintenance.routes.js";
import roomRoutes from "./routes/room.routes.js";
import userRoutes from "./routes/user.routes.js";
import complaintRoutes from "./routes/complaint.routes.js";
import visitorRoutes from "./routes/visitor.routes.js";
import parcelRoutes from "./routes/parcel.routes.js";
import entryRoutes from "./routes/entry.routes.js";
import leaveRoutes from "./routes/leave.routes.js";
import gatekeeperRoutes from "./routes/gatekeeper.routes.js";

// Middleware
import { errorHandler } from "./middleware/error.middleware.js";
import { sanitizeRequest } from "./middleware/sanitize.middleware.js";

// DB
import { connectDB } from "./dataBase/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/* ---------------- DB CONNECTION ---------------- */
connectDB();

/* ---------------- CORS CONFIG ---------------- */
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5175",
    "http://127.0.0.1:5175",
    "https://hoste-x.vercel.app"
    
];

app.use(
    cors({
        origin: function (origin, callback) {
            // allow server-to-server / postman
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            console.log("❌ Blocked CORS Origin:", origin);

            // IMPORTANT: don't throw error (prevents broken headers)
            return callback(null, false);
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

/* ---------------- MIDDLEWARE ORDER (IMPORTANT) ---------------- */
app.use(express.json());
app.use(cookieParser());
app.use(sanitizeRequest);

/* ---------------- SWAGGER ---------------- */
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "HosteX API",
            version: "1.0.0",
            description: "Hostel Management API Docs",
        },
        servers: [
            { url: "http://localhost:3000" },
        ],
        components: {
            securitySchemes: {
                bearerAuth: { type: "http", scheme: "bearer" },
            },
        },
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* ---------------- ROUTES ---------------- */
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/hostel", hostelRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/user", userRoutes);
app.use("/api/users", userRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/parcels", parcelRoutes);
app.use("/api/entry", entryRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/gatekeeper", gatekeeperRoutes);

/* ---------------- HEALTH CHECK ---------------- */
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "HosteX API is running 🚀",
    });
});

/* ---------------- 404 HANDLER ---------------- */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

/* ---------------- ERROR HANDLER ---------------- */
app.use(errorHandler);

/* ---------------- START SERVER ---------------- */
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

export default app;