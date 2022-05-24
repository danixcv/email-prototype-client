import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EmailApiResource } from "./EmailApiResource";

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    readonly email: EmailApiResource;

    constructor(private httpClient: HttpClient) {
        console.log('hier', httpClient);
        this.email = new EmailApiResource(httpClient);
    }
}