import mongoose from 'mongoose'

export default class MongoDAO {
    constructor(config) {
        this.mongoose = mongoose.connect(config.url).catch(error => {
            console.log(error)
            process.exit()
        })

        const timestamp = {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}}

        // Agregar los modelos de MongoDB
        const userSchema = mongoose.Schema(User.schema, timestamp)
        const cartSchema = mongoose.Schema(CartModel.schema, timestamp)
        const productSchema = mongoose.Schema(ProductModel.schema, timestamp)

        this.models = {
            [User.model]: mongoose.model(User.model, userSchema),
            [CartModel.model]: mongoose.model(CartModel.model, cartSchema),
            [ProductModel.model]: mongoose.model(ProductModel.model, productSchema)
        }
    }

    async create(modelName, data) {
        const Model = this.models[modelName]
        const document = new Model(data)
        await document.save()
        return document
    }

    async find(modelName, query = {}) {
        const Model = this.models[modelName]
        return Model.find(query)
    }

    async findById(modelName, id) {
        const Model = this.models[modelName]
        return Model.findById(id)
    }

    async update(modelName, id, data) {
        const Model = this.models[modelName]
        return Model.findByIdAndUpdate(id, data, { new: true })
    }

    async delete(modelName, id) {
        const Model = this.models[modelName]
        return Model.findByIdAndDelete(id)
    }
}
