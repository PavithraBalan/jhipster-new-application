import { IPet } from 'app/shared/model/pet.model';

export interface IOwner {
  id?: number;
  name?: string;
  pets?: IPet[];
}

export class Owner implements IOwner {
  constructor(public id?: number, public name?: string, public pets?: IPet[]) {}
}
