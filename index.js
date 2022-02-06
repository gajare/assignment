require('dotenv').config();
const routes = require('./routes');
const app = routes.app;
app.listen(process.env.PORT, "0.0.0.0", () => console.log('Server started on port: ' + process.env.PORT));
