import { createPostgresConnection } from "remult/postgres";
import { remultExpress } from "remult/remult-express";
import { Entity, Fields } from 'remult';

@Entity("users", {
    allowApiCrud: true
})
export class UserModel {
    @Fields.autoIncrement()
    id = 0;
    
    @Fields.string()
    username = "";

    @Fields.string()
    email = "";

    @Fields.string()
    password = "";
}

export { createPostgresConnection, remultExpress, UserModel as User };