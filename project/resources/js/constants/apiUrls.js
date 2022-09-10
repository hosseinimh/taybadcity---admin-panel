const serverConfig = require("../../../server-config.json");
const { baseUrl } = serverConfig;

export const SERVER_URL = `${baseUrl}/api`;

export const DASHBOARD_API_URLS = {
    FETCH_REVIEW: `${SERVER_URL}/dashboard/review`,
};

export const USERS_API_URLS = {
    LOGIN: `${SERVER_URL}/users/login`,
    LOGOUT: `${SERVER_URL}/users/logout`,
    FETCH_USER: `${SERVER_URL}/users/show`,
    FETCH_USERS: `${SERVER_URL}/users`,
    UPDATE_USER: `${SERVER_URL}/users/update`,
    CHANGE_PASSWORD: `${SERVER_URL}/users/change_password`,
};

export const DISTRICTS_API_URLS = {
    FETCH_DISTRICT: `${SERVER_URL}/districts/show`,
    FETCH_DISTRICTS: `${SERVER_URL}/districts`,
    STORE_DISTRICT: `${SERVER_URL}/districts/store`,
    UPDATE_DISTRICT: `${SERVER_URL}/districts/update`,
};

export const AD_CATEGORIES_API_URLS = {
    FETCH_AD_CATEGORY: `${SERVER_URL}/ad_categories/show`,
    FETCH_AD_CATEGORIES: `${SERVER_URL}/ad_categories`,
    STORE_AD_CATEGORY: `${SERVER_URL}/ad_categories/store`,
    UPDATE_AD_CATEGORY: `${SERVER_URL}/ad_categories/update`,
};
