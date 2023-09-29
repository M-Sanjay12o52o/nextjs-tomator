import mongoose from "mongoose";

let alreadyDone = false;

export default async function ensureDbConnected() {
  if (alreadyDone) {
    return;
  }
  alreadyDone = true;
  await mongoose.connect('mongodb://localhost:27017', {
    dbName: 'nextjs-tomator'
  });
}
