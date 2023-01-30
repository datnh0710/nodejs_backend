if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require("express");
const app = express();
const user_rountes = require('./routes/user_routes');
const category_rountes = require('./routes/category');
const thread_rountes = require('./routes/thread');
const post_rountes = require('./routes/post');
const connectDB = require("./database/db_connection");
connectDB();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/api', user_rountes);
app.use('/api',category_rountes);
app.use('/api',thread_rountes);
app.use('/api',post_rountes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

