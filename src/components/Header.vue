<script setup>

</script>

<template>
  <header class="header">
    <img src="../assets/logo.svg" alt="" class="header__logo">
    <nav class="header__nav">
      <RouterLink class="header__nav-link" to="/">Order Book</RouterLink>
      <RouterLink class="header__nav-link" to="/settings">Settings</RouterLink>
    </nav>
  </header>

<!--  <header>-->
<!--    <div class="wrapper">-->
<!--      <nav>-->

<!--      </nav>-->
<!--    </div>-->
<!--  </header>-->

</template>

<style lang="scss" scoped>
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px 0;
}

.header__logo{

}

.header__nav{
  display: flex;
}

.header__nav-link{
  margin-right: 20px;
  color: #EAECEF;
  text-decoration: none;

  transition: 0.4s ease;

  font-family: Arial;
  font-size: 14px;
  font-weight: 400;

  &:hover {
    color: #F0B90B;
  }
}
</style>