import { ref} from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)

const login = async (email, password) => {
    error.value = null

    try {
        const res = await projectAuth.signInWithEmailAndPassword(email, password)
        error.value = null

        return res
     } catch (err) {
        console.log(err.message)
        if(err.message === "There is no user record corresponding to this identifier. The user may have been deleted."){
            error.value = "Användaren finns inte, testa en annan email"
        } else if (err.message === "The password is invalid or the user does not have a password."){
            error.value = "Du har angivit fel lösenord"
        }
        
     }
    }

     const useLogin = () => {
        return {error, login}
     }

    

     export default useLogin
