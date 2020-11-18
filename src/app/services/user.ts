export class User {
  public get id(): string {
    return this._id;
  }

  public get username(): string {
    return this._username;
  }
  constructor(private readonly _id: string, private readonly _username: string) {
  }
}
