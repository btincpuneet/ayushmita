const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require("path");
console.log("Starting server...");
const authRoutes = require('./routes/auth/index.js');
const { sequelize } = require('./models/index.js');
const nodemailer = require("nodemailer");
require("dotenv").config();
require('./models/relations');
const footerRoutes = require("./routes/footer/footer.js");
const globalSettingRoutes = require("./routes/globalSettings/globalSetting.routes.js");
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
const contactUsRoutes = require("./routes/contact/contactRoutes.js")
const blogRoutes = require("./routes/blog/index.js");
const formRoutes = require("./routes/form/forms.js")
const buttonAppointRoutes = require("./routes/button/buttonAppointmentRoutes.js");
const countiesCitiesRoutes = require("./routes/countryCities/countiesCitiesRoutes.js");
const editorUploadRoutes = require("./routes/upload/imageUpload.routes.js");
 
const app = express();
const PORT = process.env.PORT || 5001;
 
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:8080',
    'http://localhost:8081',
    'http://13.203.47.236',
    'http://127.0.0.1:8080',
    'http://13.203.47.236'
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
app.use("/api", cmsSectionRoutes);
app.use("/api/contact-us", contactUsRoutes);
app.use("/api", formRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/button", buttonAppointRoutes);
app.use("/api/global-settings", globalSettingRoutes);
app.use("/api", countiesCitiesRoutes);
app.use("/api", editorUploadRoutes);

sequelize
  .sync()
  .then(() => console.log('Database synced successfully'))
  .catch((err) => console.error('Database sync error:', err));
 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 