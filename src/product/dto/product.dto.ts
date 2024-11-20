//definir un objeto de typescrip
export class CreateProductDTO {
  readonly name: string; //readonly documentacion
  readonly description: string;
  readonly imageURL: string;
  readonly price: number;
  readonly createAT: Date;
}
