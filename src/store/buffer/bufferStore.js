import { createStore } from 'vuex';

const bufferStore = createStore({
    state() {
        return {
            buffer: [],
            u: null,
        };
    },
    mutations: {
        addToBuffer(state, payload) {
            state.buffer = [...state.buffer, payload];
        },
        setFinalUpdateIdInEvent(state, payload) {
            state.u = payload.u;
        },
        clearBuffer(state) {
            state.buffer = [];
        },
    },
    actions: {
        addToBuffer(context, payload) {
            context.commit('addToBuffer', payload);
        },
        setFinalUpdateIdInEvent(context, payload) {
            context.commit('setFinalUpdateIdInEvent', payload);
        },
        clearBuffer(context) {
            context.commit('clearBuffer');
        },
    },
});

export default bufferStore;