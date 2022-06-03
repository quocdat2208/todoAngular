export class Task {
  public id : number;
  public title : string;
  public status: boolean
  constructor(title: string){
    this.title = title;
    this.status = false;
  }
}
