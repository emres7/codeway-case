const express = require('express')
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const { LogsRoutes } = require('./routes');



const app = express()

app.use(express.json({limit: '150mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());

app.use(cors());
app.options('*', cors());

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
  app.use('/api/v2/logs', LogsRoutes);

});


