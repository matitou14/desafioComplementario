import ProductModel from "../dao/models/products.models.js";

export const getProductById = async (id) => {
    const product = await ProductModel.findById(id).exec();
    return product;
  };
  
  export const getProductByPid = async (pid) => {
    const prod = await ProductModel.findById({ _id: pid }).lean().exec();
    return prod;
  };
  
  export const createProduct = async (newProduct) => {
    const prodGenerated = new ProductModel(newProduct)  
    await prodGenerated.save()
    return prodGenerated;
  };
  
  export const updateProduct = async (pid, productData) => {
    const product = await ProductModel.findOneAndUpdate({_id: pid}, productData, {new: true});
    return product;
  };
  
  export const deleteProduct = async (pid) => {
    const deletedProduct = await ProductModel.findByIdAndDelete(pid);
    return deletedProduct;
  };
  


export const getAllProducts = async (page = 1, limit = 4) => {
  const options = {
    page,
    limit,
    lean: true,
    sort: { price: 1 }
  };
  const result = await ProductModel.paginate({}, options);
  return {
    products: result.docs, 
    totalPages: result.totalPages,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    page: result.page,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
  };
};

