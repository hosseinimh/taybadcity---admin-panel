import { AD_CATEGORIES_API_URLS as API_URLS } from "../../constants";
import Entity from "./Entity";

export class AdCategory extends Entity {
    constructor() {
        super();
    }

    async paginate(parentId, _pn = 1, _pi = 10) {
        let path =
            parentId === 0
                ? `${API_URLS.FETCH_AD_CATEGORIES}`
                : `${API_URLS.FETCH_AD_CATEGORIES}/${parentId}`;
        return await this.handlePost(path, {
            _pn,
            _pi,
        });
    }

    async get(id) {
        return await this.handlePost(API_URLS.FETCH_AD_CATEGORY + "/" + id);
    }

    async store(parentId, title, description) {
        let path =
            parentId === 0
                ? `${API_URLS.STORE_AD_CATEGORY}`
                : `${API_URLS.STORE_AD_CATEGORY}/${parentId}`;
        return await this.handlePost(path, {
            title,
            description,
        });
    }

    async update(id, title, description) {
        return await this.handlePost(API_URLS.UPDATE_AD_CATEGORY + "/" + id, {
            title,
            description,
        });
    }
}
