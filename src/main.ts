import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
  //initiate ReplicaSet
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect('mongodb://mongo:27017/bulkdb?replicaSet=rs0',
                      function(err, db) {
    // Use the admin database for commands
    var adminDb = db.admin();
    // Default replica set conf
    var conf = {};
    adminDb.command({replSetInitiate: conf}, function(err, info) {
     console.log(info);
    });
  });
  */

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
