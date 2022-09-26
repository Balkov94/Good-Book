import { Identifiable, IdType, UserClass } from "./shared-types";

const API_BASE_URL="http://localhost:4000/api";

export interface ApiClient<K, V extends Identifiable<K>> {
    findAll(): Promise<V[]>;
    findById(id: K): Promise<V>;
    create(entityWithoutId: Partial<V>): Promise<V>;
    update(entityWithoutId: V): Promise<V>;
    deleteById(id: K): Promise<V>;

    
}

export class ApiClientImpl<K, V extends Identifiable<K>> implements ApiClient<K, V> {
    constructor(public apiCollectionSuffix: string) {}

    findAll(): Promise<V[]> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}`);
    }
    findById(id: K): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}/${id}`);
    }
    create(entityWithoutId: Partial<V>): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(entityWithoutId)
        });
    }
    update(entity: V): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}/${entity.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(entity)
        });
    }
    deleteById(id: K): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}/${id}`, {
            method: 'DELETE'
        });
    }

    private async handleRequest(url: string, options?: RequestInit) {
        try {
            const resp = await fetch(url, options);
            if(resp.status >= 400) {
                return Promise.reject(resp.body);
            }
            return resp.json();
        } catch(err) {
            return Promise.reject(err);
        }
    }
}

// export const UserApi: ApiClient<IdType, UserClass> = new ApiClientImpl('users');
// NEED REFACTORING have to CREATE CLASSES FOR in interfaces
export const UserApi: ApiClient<IdType, any> = new ApiClientImpl('users');
export const questionApi: ApiClient<IdType, any> = new ApiClientImpl('questions');
export const commentApi: ApiClient<IdType, any> = new ApiClientImpl('comments');
export const bookApi: ApiClient<IdType, any> = new ApiClientImpl('books');
export const clubApi: ApiClient<IdType, any> = new ApiClientImpl('clubs');