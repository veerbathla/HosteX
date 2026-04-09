import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import dashboardRoutes from "./routes/dashboard.routes.js";

import hostelRoutes from "./routes/hostel.routes.js";
import maintenanceRoutes from "./routes/maintenance.routes.js";
import roomRoutes from "./routes/room.routes.js";
import userRoutes from "./routes/user.routes.js";

import complaintRoutes from "./routes/complaint.routes.js";
import visitorRoutes from "./routes/visitor.routes.js";
import parcelRoutes from "./routes/parcel.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";
import { connectDB } from "./dataBase/db.js";
import entryRoutes from "./routes/entry.routes.js";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";


dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "HosteX API",
            version: "1.0.0",
            description: "Hostel Management API Docs",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                },
            },
        },
    },
    apis: ["./src/routes/*.js"] // ⚠️ IMPORTANT
};

const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/hostel", hostelRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/user", userRoutes);


app.use("/api/complaints", complaintRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/parcels", parcelRoutes);
app.use("/api/entry", entryRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

export default app;