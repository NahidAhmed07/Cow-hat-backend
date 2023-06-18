import { connect } from 'mongoose';
import { config } from './config';
import { Server } from 'http';
import app from './app';

let server: Server;

// step 5: handle uncaught exceptions and shutdown the server gracefully
process.on('uncaughtException', err => {
  console.log(err);
  console.log('Shutting down the server due to Uncaught Exception');
  process.exit(1);
});

async function run_server() {
  try {
    // step 1: connect to mongodb database
    await connect(config.db_uri as string);
    console.log('Connected to MongoDB');

    // step 2: start the server on port 5000
    server = app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });

    // step 3: handle unhandled promise rejections
    process.on('unhandledRejection', err => {
      console.log(err);
      console.log(
        'Shutting down the server due to Unhandled Promise rejection'
      );
      if (server) {
        server.close(() => {
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

// step 4: handle SIGTERM signal to gracefully shutdown the server
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  if (server) {
    server.close(() => {
      console.log('Process terminated');
    });
  }
});

run_server();
