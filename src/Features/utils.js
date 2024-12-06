
export function signinvalidation(email , password){

    if(!email && !password){
       return 'Enter Login Info'
    }else if(!email){
        return 'Email is empty'
    }else if(!password){
        return 'Password is empty'
    }

    return '' ;
}