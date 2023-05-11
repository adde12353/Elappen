 import { ref } from 'vue'


const getkWh = () => {
        const error = ref(null)
        const chartData = ref();
    
    const load = async (usersData, startDate, hrOrMonth) => {
        try {
            
            const fetchUser = await fetch(`https://backendelapp.lm.r.appspot.com/get/${usersData}/${startDate}/${hrOrMonth}`)
            const userData = await fetchUser.json()
          
            chartData.value = userData
       
        } catch (err) {
            console.log(err)
        }
       
    }
   
   
    return {error, load, chartData }
}

export default getkWh