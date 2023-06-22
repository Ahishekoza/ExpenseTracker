import bcrypt from 'bcrypt';

export const  hashPassword = async(password) =>{
   try {
    const saltsRound=10
    const hashPassword = await bcrypt.hashPassword(password,saltsRound)
    return hashPassword
    
   } catch (error) {
    return error
   }

}

export const comparePassword = async(password,userPassword) =>{

    try {
      return bcrypt.compare(password,userPassword)
    } catch (error) {
        return error
    }
}