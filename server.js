// const http = require('http');
// const PORT = process.env.PORT || 3000;
// const app = require('./app');
// const connectDB = require('./src/db/db.config');
// const server = http.createServer(app);


// app.get('/', (req, res) => {
//   res.send('Server running!');
// });


// server.listen(PORT, async () => {
//   if (process.env.NODE_ENV === 'development') {
//     console.log(`Server is running in development mode on port ${PORT}`);
//   } else {
//     console.log(`Server is running in production mode on port ${PORT}`);
//   }
//   try{

//     await connectDB();
//   }catch(Err) {
// console.log(Err)
//   }
// });



const http = require('http');
const PORT = process.env.PORT || 3000;
const app = require('./app');
const connectDB = require('./src/db/db.config');

// Create server
const server = http.createServer(app);

// Simple route for root
app.get('/', (req, res) => {
  res.send('Server running!');
});

// Database connection and server start
async function startServer() {
  try {
    await connectDB();
    console.log('Database connected successfully');
    
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
    
    server.on('error', (error) => {
      console.error('Server error:', error);
    });
    
  } catch (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1); // Exit with failure
  }
}

startServer();