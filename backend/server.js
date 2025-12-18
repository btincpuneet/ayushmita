const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require("path");
console.log("Starting server...");
const authRoutes = require('./routes/auth/index.js');
const { sequelize } = require('./models/index.js');
const nodemailer = require("nodemailer");

require('./models/relations');

const categoryRoutes = require('./routes/category/index.js');
const heroBannerRoutes = require('./routes/heroBanner/index.js');
const promoSliderRoutes = require('./routes/promoSlider/index.js');
const doctorRoutes = require('./routes/doctor/index.js');
const topPartnerHospitalRoutes = require('./routes/hospital/index.js');
const testimonialRoutes = require('./routes/testimonial/index.js');
const diseaseRoutes = require("./routes/disease/diseaseRoutes.js");
const treatmentRoutes = require("./routes/treatment/treatmentRoutes.js");
const cmsSectionRoutes = require("./routes/cmsSection/cmsSectionRoutes.js")
const faqRoutes = require("./routes/faq/index.js");

const blogRoutes = require("./routes/blog/index.js");

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
app.use(express.json());

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


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
app.use("/api", blogRoutes);
app.use("/api/cms-sections", cmsSectionRoutes);

app.post("/api/book-consultation", async (req, res) => {
   console.log("BODY RECEIVED:", req.body);
  const { name, country, city, mobile, requirement } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Consultation Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Consultation Request",
      html: `
        <h3>New Booking Received</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Country:</b> ${country}</p>
        <p><b>City:</b> ${city}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Requirement:</b> ${requirement}</p>
      `,
    });

    res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Email failed" });
  }
});

sequelize
  .sync()
  .then(() => console.log('Database synced successfully'))
  .catch((err) => console.error('Database sync error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
