require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Connection vers Mongodb
require('./Configs/db');

const UserRoute = require('./Routes/UserRoute');
const ContactRoute = require('./Routes/ContactRoute');
const VideoGameRoute = require('./Routes/VideoGameRoute');
const CommentsRoute = require('./Routes/CommentsRoute');
const DeveloppeurRoute = require('./Routes/DeveloppeurRoute');
const EditeurRoute = require('./Routes/EditeurRoute');

app.use('/api/user', UserRoute);
app.use('/api/contact', ContactRoute);
app.use('/api/videoGame', VideoGameRoute);
app.use('/api/comments', CommentsRoute);
app.use('/api/developpeur', DeveloppeurRoute);
app.use('/api/editeur', EditeurRoute);
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/imagePegi', express.static(__dirname + '/resource/ImagePegi'));

const PORT = 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));




