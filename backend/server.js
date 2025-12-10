const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require("path");

const authRoutes = require('./routes/auth/index.js');
const { sequelize } = require('./models/index.js');

// Register model relationships (Disease ↔ Treatment)
require('./models/relations');

const categoryRoutes = require('./routes/category/index.js');
const heroBannerRoutes = require('./routes/heroBanner/index.js');
const promoSliderRoutes = require('./routes/promoSlider/index.js');
const doctorRoutes = require('./routes/doctor/index.js');
const topPartnerHospitalRoutes = require('./routes/hospital/index.js');
const testimonialRoutes = require('./routes/testimonial/index.js');
const diseaseRoutes = require("./routes/disease/diseaseRoutes.js");
const treatmentRoutes = require("./routes/treatment/treatmentRoutes.js");

// ✅ NEW: FAQ Routes
const faqRoutes = require("./routes/faq/index.js");

const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://localhost:8080',
    'http://3.110.67.235'
  ],
  methods: 'GET,POST,PUT,PATCH,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Register Routes
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', heroBannerRoutes);
app.use('/api', promoSliderRoutes);
app.use('/api', doctorRoutes);
app.use("/api", topPartnerHospitalRoutes);
app.use("/api", testimonialRoutes);
app.use("/api/diseases", diseaseRoutes);
app.use("/api/treatments", treatmentRoutes);

app.use("/api", faqRoutes);
sequelize
  .sync()
  .then(() => console.log('Database synced successfully'))
  .catch((err) => console.error('Database sync error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
