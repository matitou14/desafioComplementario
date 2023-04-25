import productModel from "../dao/models/products.models.js";

export const getProductById = async (id) => {
    const product = await productModel.findById(id).exec();
    return product;
  };
  
  export const getProductByPid = async (pid) => {
    const prod = await productModel.findById({ _id: pid }).lean().exec();
    return prod;
  };
  
  export const createProduct = async (newProduct) => {
    const prodGenerated = new productModel(newProduct)  
    await prodGenerated.save()
    return prodGenerated;
  };
  
  export const updateProduct = async (pid, productData) => {
    const product = await productModel.findOneAndUpdate({_id: pid}, productData, {new: true});
    return product;
  };
  
  export const deleteProduct = async (pid) => {
    const deletedProduct = await productModel.findByIdAndDelete(pid);
    return deletedProduct;
  };
  


export const getAllProducts = async (page = 1, limit = 4) => {
  const options = {
    page,
    limit,
    lean: true,
    sort: { price: 1 }
  };
  const result = await productModel.paginate({}, options);
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

