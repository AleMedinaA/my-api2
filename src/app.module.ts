//import { AppController } from './app.controller';
//import { AppService } from './app.service';
//import { ProductModule } from './product/product.module';
//import { MongooseModule } from '@nestjs/mongoose';

//@Module({
//  imports: [
//    ProductModule,
//    MongooseModule.forRoot('mongodb://localhost/products-nest'),
//  ],
//  controllers: [AppController],
//  providers: [AppService],
//})
//export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//import { ProductService } from './product.service';
//import { ProductController } from './product.controller';
import { ProductModule } from './product/product.module';

@Module({
  //imports: [HttpModule],
  //providers: [ProductService],
  //controllers: [ProductController],
  imports: [
    MongooseModule.forRoot('mongodb://localhost/products-nest'),
    ProductModule,
  ],
})
export class AppModule {}
