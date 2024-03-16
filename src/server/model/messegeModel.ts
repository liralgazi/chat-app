import { createPostgresConnection } from "remult/postgres";
import { remultExpress } from "remult/remult-express";
import { Entity, Fields } from 'remult';

@Entity("messages", {
    allowApiCrud: true
})
export class MessageModel {
    @Fields.autoIncrement()
    id = 0;
    
    @Fields.string()
    text = "";

    @Fields.number()
    sender_id = 0;

    @Fields.date()
    created_at = new Date();

    @Fields.date()
    updated_at = new Date();
}

export { createPostgresConnection, remultExpress, MessageModel as Messege };