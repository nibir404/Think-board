require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notesRoutes = require("./routes/notesRoutes");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5001;


app.use(express.json());

// Request logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Permissive CORS
app.use(cors({
    origin: (origin, callback) => {
        // Allow any local origin (5173, 5174, etc.) on localhost or 127.0.0.1
        if (!origin || /http:\/\/localhost:\d+/.test(origin) || /http:\/\/127\.0\.0\.1:\d+/.test(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"]
}));

app.use("/api/notes", notesRoutes);

// Start Server
const startServer = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await connectDB();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running at http://localhost:${PORT}`);
            console.log(`Also accessible at http://127.0.0.1:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
