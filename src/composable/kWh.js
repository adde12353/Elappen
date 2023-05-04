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
            const fetchUser = await fetch(`http://localhost:4000/getUser/${email}`)
            const userData = await fetchUser.json()
            console.log(userData.deviceId)


            const results = await fetch(`http://localhost:4000/get/${12}`)
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

/* export default getCollection

import { ref } from 'vue'

const getkWh = () => {
const kWhUnit = ref([])
const error = ref(null)

const load = async (email) => {
    try {
        let userData = await fetch(`http://localhost:4000/getUser/${email}`)

        const {deviceId} = await userData.json()

        let data = await fetch(`http://localhost:4000/get/${deviceId}`)
        if(!data.ok){
            throw Error('ingen data tillgänglig')
        }
        kWhUnit.value = await data.json()
    }
    catch (err){
        error.value = err.message
        console.log(error.value)
    }
}

return { error, load, kWhUnit }
}

export default getkWh */