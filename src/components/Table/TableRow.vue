<script setup>
import { formatToCurrency, formatLongNumber } from "@/utils/utils.js";

const props = defineProps({
  price: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  isBids: {
    type: Boolean,
    required: true
  }
})

</script>

<template>
  <td :class="{'table__body-item-asks': !props.isBids, 'table__body-item-bids': props.isBids}">{{ formatToCurrency(price) }}</td>
  <td class="table__body-item">{{ formatLongNumber(amount) }}</td>
  <td class="table__body-item">{{ formatLongNumber(price * amount) }}</td>
</template>

<style lang="scss" scoped>
@mixin tableItemFontStyles{
  font-size: 14px;
  font-weight: 400;
  font-family: Arial;
}

.table__body-item {
  @include tableItemFontStyles;
  color: #B7BDC6;
}
.table__body-item-asks {
  @include tableItemFontStyles;
  color: #0ECB81;

  position: relative;

  &::after{
    position: absolute;
    left: 0;
    top: 0;
    width: 10px;
    height: 10px;
    background: red;
  }
}
.table__body-item-bids {
  @include tableItemFontStyles;
  color: #F6465D;

  position: relative;

  &::after{
    position: absolute;
    left: 0;
    top: 0;
    width: 10px;
    height: 10px;
    background: red;
  }
}
</style>