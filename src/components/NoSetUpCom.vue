<template>
    <div>this is no setup componet</div>


</template>
<script lang="ts">
import { ref, reactive } from 'vue'
  export default {

    setup(){
        const count =ref(0);
        return {
            count
        }
    }
  }

</script>