import bcrypt from 'bcryptjs'

const hashPassword = (value) => {
    return bcrypt.hash(value, 10)
}

export default hashPassword;