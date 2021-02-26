<template>
    <div>
        <span>{{this.warehouse}}</span>
    </div>
</template>

<script>
export default {
    data() {
    },
    async asyncData({ params }) {
      console.log(params.warehouse)
      const warehouse = params.warehouse
      return { warehouse }
    },
    methods: {
    }
}
</script>