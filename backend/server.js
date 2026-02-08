const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(uploadsDir));


app.use('/api/candidates', require('./routes/candidates'));
app.use('/api/auth', require('./routes/auth'));

app.get('/api/health', (req, res) => res.json({ status: 'Server is Healthy and Alive to Conquer', time: new Date().toISOString() }));


app.use((req, res, next) => res.status(404).json({ success: false, message: 'Route not found' }));

app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.message === 'Only PDF files are allowed!' ? 400 : 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
