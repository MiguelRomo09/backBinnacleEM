import app from './app.js'
import {connectDB} from './db.js'

const PORT = process.env.PORT;
connectDB();
app.listen(PORT)
console.log('server port', PORT);