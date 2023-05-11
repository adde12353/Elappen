<template>
<div class="container">
<Navbar />
<Chart />
</div>

   
</template>

<script>

import Navbar from '../components/Navbar.vue'
import Chart from '../components/Chart.vue'
/* import getkWh from '../composable/kWh'
 */
export default {
  name: 'BarCharts',
  components: { Chart, Navbar},
}

</script>

