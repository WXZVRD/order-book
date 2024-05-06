<script setup>
import TableRow from "@/components/Table/TableRow.vue";

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  isBids: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <v-table class="table">
    <thead>
    <tr>
      <th class="table__head-item">Price</th>
      <th class="table__head-item">Amount</th>
      <th class="table__head-item">Total</th>
    </tr>
    </thead>
    <tbody class="table__body">
    <tr
        v-for="item in props.data"
        :key="item[0]"
        :style="{
          'background': `linear-gradient(to left, ${
        props.isBids ? '#2d1e24' : '#152b28'
      } ${(item[1] / 11) * 100}%, rgba(0, 0, 0, 0) 0%)`,
        }"
    >
      <TableRow :is-bids="props.isBids" :amount="item[1]" :price="item[0]"/>
    </tr>
    </tbody>
  </v-table>
</template>

<style lang="scss" scoped>
.table{
  max-height: 75vh;
  background: none;
  max-width: 400px;
  width: 100%;
  border-top: 1px solid gray;
}
.table__body {
  overflow: auto;
}

.table__head-item {
  color: #848E9C;

  font-size: 14px;
  font-weight: 600;
  font-family: Arial;
  line-height: 20px;
}

@media (max-width: 868px) {
  .table{
    max-height: 40vh;
  }
}
</style>