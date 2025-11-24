const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth/index.js');
const { sequelize } = require('./models/index.js');
const categoryRoutes = require('./routes/category/index.js'); // Import category routes

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/', authRoutes); 
app.use('/api', categoryRoutes);  // Register category routes


// Sync database and start server
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Error syncing database:', err));

app.listen(PORT, () => {
  console.log(`Server is running`);
});
