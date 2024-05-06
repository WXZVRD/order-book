import { createRouter, createWebHistory } from 'vue-router'
import OrderBookView from '../views/OrderBookView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'orderBook',
      component: OrderBookView,
      meta: {
        title: 'Binance - Home',
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
      meta: {
        title: 'Binance - Settings',
      },
    }
  ]
})

export default router
