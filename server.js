const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
app.use(cors());

const userRoutes = require('./routes/userRoutes'); // make sure the path is correct
const adminRoutes = require('./routes/ adminRoutes'); // Import admin routes
const isAdmin = require('./middlewares/isAdmin'); // Import isAdmin middleware
const verifyToken = require('./middlewares/verifyToken'); // Adjust the path as needed
const logoutRouter = require('./routes/logout'); // Adjust the path as needed

// ...





app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));
// User routes
// Include the logout router as middleware
app.use('/api', logoutRouter); // Adjust the route path as needed
app.use('/api/users', userRoutes); // all user routes will be prefixed with '/api/users'
app.use('/api/admin', verifyToken, adminRoutes); // Prefix admin routes with '/api/admin'
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

