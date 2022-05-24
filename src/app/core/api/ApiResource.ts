import { Observable } from "rxjs";
import {HttpClient} from "@angular/common/http";

export abstract class ApiResource<TEntity> {
    
    readonly url: string;
    protected client: HttpClient;

    protected constructor(url: string, client: HttpClient) {
        this.url = 'https://localhost:7290/api' + url;
        this.client = client;
    }

    getList(): Observable<TEntity[]> {
        return this.client.get<TEntity[]>(this.url);
    }

    getOne(id: string): Observable<TEntity> {
        return this.client.get<TEntity>(this.url + '/' + id);
    }

    create(entity: TEntity): Observable<TEntity> {
        return this.client.post<TEntity>(this.url, entity);
    }

    update(id: string, entity: TEntity): Observable<TEntity> {
        return this.client.put<TEntity>(this.url + '/' + id, entity);
    }

    delete(id: string): Observable<void> {
        return this.client.delete<void>(this.url + '/' + id);
    }
}