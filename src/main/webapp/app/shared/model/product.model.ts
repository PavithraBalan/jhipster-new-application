export interface IProduct {
  id?: number;
  title?: string;
  description?: string;
  rating?: number;
  url?: string;
}

export class Product implements IProduct {
  constructor(public id?: number, public title?: string, public description?: string, public rating?: number, public url?: string) {}
}
