import { authToken, ClubClass, CommentClass, Identifiable, IdType, QuestionClass, UserClass } from "./shared-types";

const API_BASE_URL = "http://localhost:8000/api";

export interface ApiClient<K, V extends Identifiable<K>> {
    findAll(): Promise<V[]>;
    findById(id: K): Promise<V>;
    create(entityWithoutId: Partial<V>,token?:authToken): Promise<V> ;
    update(entityWithoutId: V, token?:authToken): Promise<V>;
    deleteById(id: K, token?:authToken): Promise<V>;
}

export class ApiClientImpl<K, V extends Identifiable<K>> implements ApiClient<K, V> {
    constructor(public apiCollectionSuffix: string) { }

    findAll(): Promise<V[]> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}`);
    }

    findById(id: K): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}/${id}`);
    }

    create(entityWithoutId: Partial<V>, token?:string): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': token ?? 'testToken',
            },
            body: JSON.stringify(entityWithoutId)
        });
    }

    update(entity: V, token?:authToken): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}/${entity.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': token ?? 'testToken',
            },
            body: JSON.stringify(entity)
        });
    }

    deleteById(id: K, token?:authToken): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': token ?? 'testToken',
            },
        });
    }

    private async handleRequest(url: string, options?: RequestInit) {
        try {
            const resp = await fetch(url, options);
            if (resp.status >= 400) {
                return Promise.reject(resp.body);
            }

            return resp.json();
        } catch (err) {
            return Promise.reject(err);
        }
    }
}

// export const UserApi: ApiClient<IdType, UserClass> = new ApiClientImpl('users');
export const UserApi: ApiClient<IdType, UserClass> = new ApiClientImpl('AllUsers');
export const questionApi: ApiClient<IdType, QuestionClass> = new ApiClientImpl('QuestionRoom');
export const commentApi: ApiClient<IdType, CommentClass> = new ApiClientImpl('');
export const bookApi: ApiClient<IdType, any> = new ApiClientImpl('ExchangePage');
export const clubApi: ApiClient<IdType, ClubClass> = new ApiClientImpl('ReadingClubs');