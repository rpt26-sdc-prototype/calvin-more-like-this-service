const {app} = require('./server.js');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});