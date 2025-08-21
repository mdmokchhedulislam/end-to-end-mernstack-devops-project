import { Server } from 'http';
import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

let server: Server;

const DATABASE_URL="mongodb://mongo-service:27017/mydb"
const PORT ="8080"
async function main() {
  try {

    await mongoose.connect(DATABASE_URL as string);

    server = app.listen(PORT, () => {
      console.log(`BookBazaar server is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();

process.on('unhandledRejection', () => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
