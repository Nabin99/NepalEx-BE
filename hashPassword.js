import bcrypt from "bcrypt";

const hashPassword = async (password) => {
    const salt = "$2b$10$jrp88FFrtbjiP2pQLJz3u."
    return await bcrypt.hash(password, salt);
}


export default hashPassword;