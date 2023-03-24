import productModel from "../dao/models/products.models.js";

export const getAllProducts = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 4;
    
    const options = {
      page,
      limit,
      lean: true,
      sort: { price: 1 }
    };
    
    const result = await productModel.paginate({}, options);
    const prevLink = result.hasPrevPage ? `/products?page=${result.prevPage}` : '';
    const nextLink = result.hasNextPage ? `/products?page=${result.nextPage}` : '';
    res.render('products', { 
      products: result.docs, 
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink,
      nextLink
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId).exec();
    res.render('product', { product });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

export const getProductByPid = async (req, res) => {
  const { pid } = req.params;
  const prod = await productModel.findById({ _id: pid }).lean().exec();
  if (prod) {
    res.render("index", { prod });
  } else {
    res.status(404).send('Product not found');
  }    
};  

export const createProduct = async (req, res) => {
  const newProduct = req.body;

  try {
    const prodGenerated = new productModel(newProduct)  
    await prodGenerated.save()
    res.redirect(`/api/products'${prodGenerated.name}`)
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }  
};  

export const updateProduct = async (req, res) => {
  const {pid} = req.params;
  const {title, description, code, price, status, stock, category, thumbnails} =req.body;
  try{
    const product = await productModel.findOneAndUpdate({_id: pid},{
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    }, {new: true});
    if (!product){
    return res.status(404).json({message:'Product not found'});
   
  }
  res.json(product);
} catch (error){
  console.error(error);
  res.status(500).send('Internal Server Error');
  }
};

export const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    const deletedProduct = await productModel.findByIdAndDelete(pid);
    if (!deletedProduct) {
      return res.status(404).send('Product not found');
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
