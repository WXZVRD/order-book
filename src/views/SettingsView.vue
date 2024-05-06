<template>
  <div class="settings-page">
    <div class="setting__container">
      <v-select
          style="max-width: 130px"
          v-model="selectedPair"
          :items="pairs"
          @update:modelValue="updatePair"
          label="Select Pair"
          dense
          outlined
          class="select"
      ></v-select>

      <div class="pair__history">
        <h1 style="margin-bottom: 20px;">Pair history</h1>
        <div v-for="(historyItem, index) in pairHistory" :key="index" class="pair__history-item">
          <div class="pair__history-item__pair">
            Pair: {{ historyItem[0] }}
          </div>
          <div class="pair__history-item__time">
            Time: {{ historyItem[1] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import pairStore from "@/store/pair/pairStore.js";

const selectedPair = ref(pairStore.state.pair);
const pairs = ["BTCUSDT", "BNBBTC", "ETHBTC"];
const pairHistory = ref([]);

const updatePair = () => {
  pairStore.commit('setPair', selectedPair.value);

  const newHistoryData = [
    selectedPair.value,
    new Date().toLocaleTimeString()
  ];

  pairHistory.value.push(newHistoryData);
  localStorage.setItem('pairHistory', JSON.stringify(pairHistory.value));
};

onMounted(() => {
  const data = localStorage.getItem('pairHistory');
  if (data) {
    pairHistory.value = JSON.parse(data);
  }
});
</script>

<style scoped>
.pair__history-item{
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px 20px;
  border: 1px solid gray;
}
.pair__history{
  padding: 10px 20px;
  max-width: 600px;
  width: 100%;
}
.select{
  max-width: 250px;
  width: 100%;
  height: 50px;
}
.setting__container{
  display: flex;
  justify-content: space-between;
}
.settings-page {
  color: #fff;
  padding: 20px;
}
@media (max-width: 868px) {
  .setting__container{
    flex-direction: column;
    align-items: center;
  }
}
</style>
