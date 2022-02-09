import Dexie, { Table } from "dexie";
import { nanoid } from "nanoid";

export interface IPermission {
  id: string;
  action: string;
  subject: string;
}

export interface IUser {
  id: string;
  name: string;
  phone: string;
}

class Db extends Dexie {
  permission!: Table<IPermission>;
  user!: Table<IUser>;

  constructor() {
    super("db");
    this.version(1).stores({
      permission: "++id,action,subject",
      user: "++id,name,phone",
    });
  }
}

export const db = new Db();

