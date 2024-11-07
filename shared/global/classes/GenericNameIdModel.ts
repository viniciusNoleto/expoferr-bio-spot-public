export interface IGenericNameIdModel {
  id: number;
  name: string;
}

export class GenericNameIdModel implements IGenericNameIdModel {
  id: number;
  name: string;

  constructor(json: IGenericNameIdModel) {
    this.id = json.id;
    this.name = json.name;
  }
};
