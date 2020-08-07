import { IOwner } from 'app/shared/model/owner.model';

export interface IPet {
  id?: number;
  name?: string;
  species?: string;
  owner?: IOwner;
}

export class Pet implements IPet {
  constructor(public id?: number, public name?: string, public species?: string, public owner?: IOwner) {}
}
