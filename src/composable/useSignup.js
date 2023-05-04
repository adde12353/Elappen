
import {ref} from 'vue'
import { projectAuth } from '../firebase/config';


const error = ref(null)


const signUp = async (email, password, displayName) => {
    error.value = null;

    try {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        if(!res) {
            throw new Error('Logging funkade inte')
        }
        await res.user.updateProfile({displayName})
        
        error.value = null
        return res

    } catch(err) {

        console.log(err.message, typeof err.message)
        if (err.message === "The email address is already in use by another account."){
            error.value = "E-postadressen används redan av ett annat konto."
        }
        
    }

}

const useSignup = () => {
   
    return {error, signUp}
}


export default useSignup