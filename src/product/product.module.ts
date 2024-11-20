import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; //importa HttpModule
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema'; //importar un nuevo schema

@Module({
  imports: [
    HttpModule, //esto es para las solicitudes de HTTP
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema }, //ya tenemos conexión con mongodb
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
