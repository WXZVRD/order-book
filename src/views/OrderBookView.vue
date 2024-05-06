<script setup>
import {onMounted, ref} from "vue";
import bufferStore from "@/store/buffer/bufferStore.js";
import orderBookStore from "@/store/orderBook/orderBookStore.js";
import pairStore from "@/store/pair/pairStore.js";
import WebSocketWrapper from "../services/ws.js";
import Table from "@/components/Table/Table.vue";

const selectedLimit = ref(pairStore.state.limit);

const ws = WebSocketWrapper(`wss://stream.binance.com:9443/ws/${pairStore.state.pair.toLowerCase()}@depth`);

onMounted(() => {
  orderBookStore.dispatch('fetchOrderBook', { pair: pairStore.state.pair, limit: pairStore.state.limit });
});

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  processMessages(event)
  console.log(`Received order book update for pair: ${pairStore.state.pair}`, data);
};

ws.onclose = () => {
  console.log(`WebSocket connection closed for pair: ${pairStore.state.pair}`);
};

ws.onerror = (error) => {
  console.error(`WebSocket error occurred for pair: ${pairStore.state.pair}`, error);
};

const processMessages = (event) => {
  const response = JSON.parse(event.data);
  console.log('Proccesing message: ', response)
  bufferStore.commit('setFinalUpdateIdInEvent', response);
  if (orderBookStore.state.lastUpdateId === 0) {
    bufferStore.commit('addToBuffer', response);
  }
  if (orderBookStore.state.lastUpdateId === 0 && orderBookStore.state.isLoading === false) {
    onMounted(() => {
      orderBookStore.dispatch('fetchOrderBook', { pair: pairStore.state.pair, limit: pairStore.state.limit });
    });
  }

  if (orderBookStore.state.lastUpdateId > 0) {
    if (bufferStore.state.buffer.length > 0) {
      proccessBuffer(bufferStore.state.buffer, orderBookStore.state.lastUpdateId);
      bufferStore.commit('clearBuffer');
    }
    if (response.u > orderBookStore.state.lastUpdateId) {
      proccessUpdate(response);
    }
  }
};

const proccessBuffer = (buffer, lastUpdateId) => {
  let newLastUpdateId = lastUpdateId;
  for (const event of buffer) {
    if (event.u >= newLastUpdateId + 1 && event.U <= newLastUpdateId + 1) {

      orderBookStore.commit('updateSnapshot', event);
      newLastUpdateId = event.u;
    }
  }
};

const proccessUpdate = (update) => {
  orderBookStore.commit('updateSnapshot', update);
};

const updateLimit = () => {
  pairStore.commit('setLimit', selectedLimit.value);
}
</script>

<template>
  <div class="order__book">
    <div class="order__book-header">
      <v-app-bar-title class="order__book-header__title">{{ pairStore.state.pair }}</v-app-bar-title>
      <v-select
          v-model="selectedLimit"
          @update:modelValue="updateLimit"
          :items="[100, 500, 1000]"
          variant="solo-inverted"
          theme="dark"
          label="Items per page"
          style="max-width: 130px"
          dense
      ></v-select>
    </div>
    <div class="order__book-table">
      <Table :is-bids="true" :data="orderBookStore.state.bids.slice(0, selectedLimit)" />
      <Table :is-bids="false" :data="orderBookStore.state.asks.slice(0, selectedLimit)" />
    </div>
  </div>
</template>


<style>
.order__book-header{
  display: flex;
  align-items: center;
}
  .order__book-header__title{
    font-size: 20px;
    font-weight: 500;
    color: rgb(234, 236, 239);
  }
  .order__book-table{
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 868px) {
    .order__book-table{
      flex-direction: column;
      align-items: center;
    }
  }
</style>
