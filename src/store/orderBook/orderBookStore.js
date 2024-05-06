import { createStore } from 'vuex';
import {manageOrderBook} from "@/utils/utils.js";

const orderBookStore = createStore({
    state() {
        return {
            lastUpdateId: 0,
            bids: [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
            ],
            asks: [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
            ],
            isLoading: false,
            message: '',
        };
    },
    mutations: {
        setBids(state, bids) {
            state.bids = bids;
        },
        setAsks(state, asks) {
            state.asks = asks;
        },
        setLastUpdatedId(state, lastUpdatedId) {
            state.lastUpdateId = lastUpdatedId;
        },
        setIsLoading(state, isLoading) {
            state.isLoading = isLoading;
        },
        setMessage(state, message) {
            state.message = message;
        },
        updateSnapshot(state, event) {
            console.log('updateSnapshot', event)
            state.lastUpdateId = event.u;
            state.bids = manageOrderBook(state.bids, event.b, 'bids');
            state.asks = manageOrderBook(state.asks, event.a, 'asks');
        }
    },
    actions: {
        async fetchOrderBook({ commit, state }, { pair, limit }) {
            try {
                commit('setIsLoading', true);
                const response = await fetch(`https://uncors.vercel.app/?url=https://binance.com/api/v3/depth?symbol=${pair}&limit=${limit}`, {
                    method: 'GET',
                });
                const responseData = await response.json();
                commit('setBids', responseData.bids);
                commit('setAsks', responseData.asks);
                commit('setLastUpdatedId', responseData.lastUpdateId);
                console.log("Received initial order book data:", responseData);
                commit('setIsLoading', false);
                return responseData;
            } catch (error) {
                commit('setMessage', `Error fetching initial order book data: ${error}`);
                console.error("Error fetching initial order book data:", error);
            }
        }
    },
});

export default orderBookStore;