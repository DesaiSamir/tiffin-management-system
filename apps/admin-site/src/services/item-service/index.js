/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-useless-catch */
import axios from 'axios';

const BASE_URL = 'http://localhost:3003/api';

const api = axios.create({
  baseURL: BASE_URL,
});

export const itemService = {
    getAllItems: async () => {
        try {
            const response = await api.get('/item');
            if (response)
                return response.data;
            return [];
        } catch (error) {
            throw error;
        }
    },
    createItem: async (payload) => {
        try {
            const response = await api.post(`/item`, payload);
            if (response)
                return response.data;
            return [];
        } catch (error) {
            throw error;
        }
    },
    saveItem: async (id, payload) => {
        try {
            const response = await api.patch(`/item/${id}`, payload);
            if (response)
                return response.data;
            return [];
        } catch (error) {
            throw error;
        }
    },
    removeItems: async (payload) => {
        try {
            const response = await api.delete(`/item?ids=${payload.join(',')}`);
            if (response)
                return response.data;
            return [];
        } catch (error) {
            throw error;
        }
    },
    getAllItemTypes: async () => {
        try {
            const response = await api.get('/item-type');
            if (response)
                return response.data;
            return [];
        } catch (error) {
            throw error;
        }
    },
  // Other functions for CRUD operations on items
};

