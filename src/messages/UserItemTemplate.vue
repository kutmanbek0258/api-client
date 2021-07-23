<template>
  <div>
    <b>#{{item.id}}</b>
    <span>{{ item.firstName }}</span>
    <abbr>{{item.lastName}}</abbr>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
    searchText: { required: true }
  }
}
</script>