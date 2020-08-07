export interface IAuthor {
  id?: number;
  firstName?: string;
  lastName?: string;
}

export class Author implements IAuthor {
  constructor(public id?: number, public firstName?: string, public lastName?: string) {}
}
