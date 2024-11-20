//import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
//import { HttpService } from '@nestjs/axios';
//import { catchError } from 'rxjs/operators';
//import { throwError } from 'rxjs';
//import { Model } from 'mongoose';
//import { InjectModel } from '@nestjs/mongoose';

//import { Product } from './interfaces/product.interface'; //imporar la interfaz creada
//import { CreateProductDTO } from './dto/product.dto';

//@Injectable()
//export class ProductService {
//  constructor(
//    @InjectModel('Product') private readonly productModel: Model<Product>,
//  ) {}
//  async getProducts(): Promise<Product[]> {
//    const products = await this.productModel.find(); //el find es para consultar todos los datos de mongo db
//    return products;
// }

//  async getProduct(productID: string): Promise<Product> {
//esto es una consulta tambien es una promesa
//    const product = await this.productModel.findById(productID); //busca un producto de un solo ID
//    return product;
//  }

//  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
//    const product = await new this.productModel(createProductDTO);
//    return await product.save();
//}

//  async deleteProduct(productID: string): Promise<Product> {
//    const deletedProduct = await this.productModel.findByIdAndDelete(productID); //consulta
//    return deletedProduct;
//  }

//  async updateProduct(
//    productID: string,
//    createProductDTO: CreateProductDTO,
//  ): Promise<Product> {
//edito algo
//    const updateProduct = await this.productModel.findByIdAndUpdate(
//      productID,
//      createProductDTO,
//      { new: true },
//    ); //se actualiza y se da el objeto nuevo
//    return updateProduct;
//  }
//}

/*
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ProductService {
  constructor(private readonly httpService: HttpService) {}

  // Método que obtiene productos desde la API externa
  async getProductsFromExternalApi() {
    try {
      const response = await this.httpService
        .get(
          'https://www.liverpool.com.mx/tienda/oneColumnPageData?productId=1145413349&pdpType=default&skuId=',
          //'https://www.liverpool.com.mx/tienda/oneColumnPageData?',
          //'https://www.liverpool.com.mx/tienda/home',
        )
        .toPromise();

      return response.data; // Retorna los productos obtenidos de la API externa
    } catch (error) {
      // Manejo de errores
      throw new Error(
        'Error al obtener productos de la API externa: ' + error.message,
      );
    }
  }
} lo anterior fue intento para la api de liverppol*/

/*import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ProductService {
  constructor(private readonly httpService: HttpService) {}

  // Método que obtiene productos desde la Fake Store API
  async getProductsFromExternalApi() {
    try {
      const response = await this.httpService
        .get('https://fakestoreapi.com/products')
        .toPromise();

      // Transformamos los datos para enviar solo los campos necesarios
      const transformedProducts = response.data.map((product) => ({
        name: product.title,
        price: product.price,
        image: product.image,
      }));

      return transformedProducts; // Retorna los productos transformados
    } catch (error) {
      // Manejo de errores
      throw new Error(
        'Error al obtener productos de la API externa: ' + error.message,
      );
    }
  }
}*/
import { Injectable } from '@nestjs/common'; // Para usar Injectable
import { HttpService } from '@nestjs/axios'; // Para realizar peticiones HTTP con Axios
import { InjectModel } from '@nestjs/mongoose'; // Para inyectar modelos de MongoDB
import { Model } from 'mongoose'; // Modelo de datos para MongoDB
import { Product } from './interfaces/product.interface'; // Interfaz del Producto

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>, // Inyección del modelo MongoDB
    private readonly httpService: HttpService, // Servicio HTTP (Axios) para consumir APIs externas
  ) {}

  // Obtener productos locales desde MongoDB
  async getLocalProducts(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  // Obtener productos desde la API externa
  async getProductsFromExternalApi(): Promise<any[]> {
    try {
      const response = await this.httpService
        .get('https://fakestoreapi.com/products') // Llamada a la API externa
        .toPromise();

      // Transformar los datos para adaptarlos a tu estructura
      const transformedProducts = response.data.map((product) => ({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
      }));

      return transformedProducts;
    } catch (error) {
      // Manejo de errores en la API externa
      throw new Error(
        'Error al obtener productos de la API externa: ' + error.message,
      );
    }
  }

  // Combinar productos locales y externos
  async getAllProducts(): Promise<any[]> {
    const localProducts = await this.getLocalProducts(); // Productos locales de MongoDB
    const externalProducts = await this.getProductsFromExternalApi(); // Productos de la API externa
    return [...localProducts, ...externalProducts]; // Combina ambos conjuntos
  }

  // Crear un producto en la base de datos local
  async createProduct(createProductDTO: Product): Promise<Product> {
    const newProduct = new this.productModel(createProductDTO);
    return await newProduct.save();
  }

  // Buscar un producto por ID en MongoDB
  async getProduct(productID: string): Promise<Product> {
    return await this.productModel.findById(productID).exec();
  }

  // Eliminar un producto por ID en MongoDB
  async deleteProduct(productID: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(productID).exec();
  }
}
