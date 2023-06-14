import UserDTO from "../dao/models/DTO/UserDTO"

export default class UserRepository {
    constructor(dao) {
        this.dao = dao
    }

    get = async () => await this.dao.get()
    create = async (data) => {
        const dataToInsert = new UserDTO(data)
        return await this.dao.create(dataToInsert)
    }
    getByID  = async (id) => await this.dao.getByID(id)
 }