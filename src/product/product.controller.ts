//aqui se define las rutas que va tener nuestro servidor
/*import {
  Controller,
  Get,
  Post,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Query,
  Put,
} from '@nestjs/common';

import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service'; //importar la clase product service

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {} //ya tengo instanciado el servicio

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    //minscula es la clase y la mayusculas instancia
    //console.log(createProductDTO); //para verlo en pantalla
    const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Producto Satisfactoriamente creado',
      product: product, //cuando se creo el producto
    });
  }

  @Get('/') //para ver los productos
  async getProducts(@Res() res) {
    //atraves del metodo getproducts davuelveme todo
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      //respuesta al cliente , enviare un json
      products,
    });
  }

  //ahora para un solo porducto con el id
  @Get('/:productID')
  async getProduct(@Res() res, @Param('productID') productID) {
    //cuando pida un id será almacenado , una vez uqe lo tome lo pasa al servicio
    const product = await this.productService.getProduct(productID);
    //si no existe el producto es que esta vacio y si esta vacio que retorne un error
    if (!product) throw new NotFoundException('Product Does not existe');
    return res.status(HttpStatus.OK).json(product);
  }

  @Delete('/delete')
  async detleteProduct(@Res() res, @Query('productID') productID) {
    const productDeleted = await this.productService.deleteProduct(productID);
    if (!productDeleted) throw new NotFoundException('Product Does not existe');
    return res.status(HttpStatus.OK).json({
      message: 'Producto Borrado',
      productDeleted,
    });
  }
  //para editar o actualizar
  @Put('/update')
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
    @Query('productID') productID,
  ) {
    const updateProduct = await this.productService.updateProduct(
      productID,
      createProductDTO,
    );
    if (!updateProduct) throw new NotFoundException('Product Does not existe');
    return res.status(HttpStatus.OK).json({
      message: 'Producto editado correctamente',
      updateProduct,
    });
  }
}*/

/*import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Res() res) {
    const products = await this.productService.getProductsFromExternalApi();
    return res.status(HttpStatus.OK).json({
      message: 'Productos obtenidos de la API externa',
      products,
    });
  }
} liverpool*/

import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Obtener solo los productos de la API externa
  //@Get('external')
  //async getProductsFromExternalApi() {
  //  return await this.productService.getProductsFromExternalApi();
  //}

  // Obtener productos locales y externos combinados
  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }
}
