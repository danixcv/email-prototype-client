import { HttpClient } from "@angular/common/http";
import { Email } from "../models/Email";
import { ApiResource } from "./ApiResource";

export class EmailApiResource extends ApiResource<Email> {

    constructor(client: HttpClient) {
        super('/email', client);
    }
}