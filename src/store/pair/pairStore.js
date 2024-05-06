import { createStore } from 'vuex';

const pairStore = createStore({
    state() {
        return {
            pair: "BNBBTC",
            limit: 100,
        };
    },
    mutations: {
        setPair(state, newPair) {
            state.pair = newPair;
        },
        setLimit(state, newLimit) {
            state.limit = newLimit;
            console.log(newLimit)
        },
    },
    actions: {
        updatePair(context, newPair) {
            context.commit('setPair', newPair);
        },
        updateLimit(context, newLimit) {
            context.commit('setLimit', newLimit);
        },
    },
});

export default pairStore;
