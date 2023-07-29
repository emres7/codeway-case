const express = require('express')
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const { LogsRoutes } = require('./routes');



const app = express()
const port = process.env.APP_PORT || 3000
app.use(express.json({limit: '150mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());

app.use(cors());
app.options('*', cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  app.use('/api/v2/logs', LogsRoutes);

});


