import { ref } from 'vue'


const getkWh = () => {
        const error = ref(null)
        const kWhUnit = ref();
        const kWhDate = ref();
        const kWhAll = ref();

    const load = async (email) => {
        console.log(email)
        try {
            let data =[]
            let date =[]
            let kWs =[]
            const fetchUser = await fetch(`https://backendelapp.lm.r.appspot.com/getUser/${email}`)
            const userData = await fetchUser.json()
            console.log(userData.deviceId)


            const results = await fetch(`https://backendelapp.lm.r.appspot.com/get/${12}`)
            let filterTokW = await results.json()
            filterTokW.forEach(kW => {
                kWs.push(kW.w)
                date.push(kW.date)
                data.push(kW)
            });
            kWhDate.value = date
            kWhUnit.value = kWs
            kWhAll.value = data

            

        } catch (err) {
            console.log(err)
        }
    }
   
   
    return {error, kWhUnit, load, kWhDate, kWhAll}
}

export default getkWh