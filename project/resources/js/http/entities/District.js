import { DISTRICTS_API_URLS as API_URLS } from "../../constants";
import Entity from "./Entity";

export class District extends Entity {
    constructor() {
        super();
    }

    async paginate(parentId, _pn = 1, _pi = 10) {
        let path =
            parentId === 0
                ? `${API_URLS.FETCH_DISTRICTS}`
                : `${API_URLS.FETCH_DISTRICTS}/${parentId}`;
        return await this.handlePost(path, {
            _pn,
            _pi,
        });
    }

    async get(id) {
        return await this.handlePost(API_URLS.FETCH_DISTRICT + "/" + id);
    }

    async store(parentId, name, description) {
        let path =
            parentId === 0
                ? `${API_URLS.STORE_DISTRICT}`
                : `${API_URLS.STORE_DISTRICT}/${parentId}`;
        return await this.handlePost(path, {
            name,
            description,
            lat: 0,
            lng: 0,
        });
    }

    async update(id, name, description) {
        return await this.handlePost(API_URLS.UPDATE_DISTRICT + "/" + id, {
            name,
            description,
            lat: 0,
            lng: 0,
        });
    }
}
