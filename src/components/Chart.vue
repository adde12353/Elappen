<template>
<div>
  <button @click="dayFilter()" :style="!hrOrMonth ? 'background-color: #03a889' : ''">Månad</button>
    <button @click="hrFilter()" :style="hrOrMonth ? 'background-color: #03a889' : ''"
    >timme</button>
   
<canvas id="myChart"></canvas>
   <input 
   type="date"
   v-if="hrOrMonth"
   v-model="startDate"
   @change="filterData"
   style="margin-bottom: 10px"
   >
   <input 
   type="month"
   v-if="!hrOrMonth"
   v-model="startDate"
   @change="filterData"
   style="margin-bottom: 10px"
   >
  
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { Chart } from 'chart.js/auto'
import { onMounted, ref, watchEffect} from '@vue/runtime-core'
import getkWh from '../composable/kWh'
import getUser from '../composable/getUser'
import dayjs from 'dayjs'
import { hr } from 'date-fns/locale'


export default {
  components: { Chart, Navbar},
  setup () {
   
    const {user} = getUser()
    const {kWhUnit, error, load, kWhDate, kWhAll} = getkWh() 
    const dataForChart = ref(kWhUnit.value)
const dateForChart = ref(kWhDate.value)
const hrOrMonth = ref(true)

  

    let chart;
    const startDate = ref()
    
  onMounted( async () => { 
    await load(user.value.email)

 dataForChart.value= kWhUnit.value
dateForChart.value = kWhDate.value


  const ctx = document.getElementById('myChart');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dateForChart.value,
      datasets: [{
        label: 'W',
        data: dataForChart.value,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
  })


const hrFilter = () => {
hrOrMonth.value = true
//true hr false month
}
const dayFilter = () => {
hrOrMonth.value = false
}

  const filterData = () => {
  const fetchDayData = async () => {
   const fetchUser = await fetch(`https://backendelapp.lm.r.appspot.com/test1/`, { 
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        startDate: startDate.value,
        hourDatA: hrOrMonth.value})
        })

    const userData = await fetchUser.json()

      if(hrOrMonth.value){
          userData.forEach(item => {
      item.date = dayjs(item.date).format('HH')
    })
      } else if (!hrOrMonth.value) {
       
        userData.forEach(item => {
      item.date = dayjs(item.date).format('D')
      console.log(item.date)
    }) 
      }
      console.log(userData)

 let data = []
  let dates = []
const reduceDates = Object.values(
            userData.reduce((acc, item) => {
                acc[item.date] =  acc[item.date]
                ? {...item, w: item.w + acc[item.date].w}
                :item;
                return acc
            }, {}))
let timeData = [] // filter data
let dateData = []
// skapa 23 timmar även utan data
if(hrOrMonth.value){
for(let i = 0; i < 24; i++){
  const data ={
  date : i,
  w: 0
  }
  timeData.push(data)
  } 
} else {
  if(startDate.value == "2023-01" |startDate.value == "2023-03" |startDate.value == "2023-05" | startDate.value =="2023-07" | startDate.value =="2023-09" | startDate.value =="2023-11") {
    for(let i = 0; i < 32; i++){
  const data ={
  date : i,
  w: 0
  }
  timeData.push(data)
  } 
  } else {
for(let i = 0; i < 31; i++){
  const data ={
  date : i,
  w: 0
  }
  timeData.push(data)
  } 
  }
  
}
  console.log(timeData)
  timeData.forEach(itemTime => {
  reduceDates.forEach(item => {
  if(itemTime.date == item.date)
  {
   itemTime.date = item.date
   itemTime.w = item.w
  } 
})
})

timeData.forEach(item => {
  data.push(item.w)
  dates.push(item.date)
})

dataForChart.value = data
dateForChart.value = dates

chart.data.labels = dateForChart.value
chart.data.datasets[0].data = dataForChart.value

chart.update()
}
   
   fetchDayData()
  }
  return {filterData, startDate, kWhUnit, hrFilter, dayFilter, hrOrMonth}
  }
}
</script>