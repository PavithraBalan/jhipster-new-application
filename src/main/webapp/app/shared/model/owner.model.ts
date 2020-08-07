export interface IOwner {
  id?: number;
  name?: string;
}

export class Owner implements IOwner {
  constructor(public id?: number, public name?: string) {}
}
