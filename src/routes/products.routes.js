import { Router } from "express";
import fs from 'fs';
import path from 'path';
import productModel from "../dao/models/products.models.js";
import __dirname from "../utils.js";

const router = Router();

const products = []

const prodfile = path.join(__dirname, 'data', 'products.json');





async function getProducts() {
    try {
      const data = await fs.promises.readFile(prodfile);
      const parsedData = JSON.parse(data);
      return parsedData;
    } catch (error) {
      console.error(error);
      return [];
    }  
  }  

async function getProductById(productId) {
  try {
    const products = await getProducts();
    const product = products.find(p => p.id === productId);
    return product;
  } catch (error) {
    console.error(error);
    return null;
  }  
}  


router.get('/', async (req, res) => {
  const products = await productModel.find().lean().exec();
  res.render('products', { products });
  console.log(products);
});  



router.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  const prod = await productModel.findOne({ _id: pid }).lean().exec();
  if (prod) {
    res.render("index", { prod });
  } else {
    res.status(404).send('Product not found');
  }    
});  

async function getNextProductId() {
  try {
    const products = await getProducts();
    const lastProduct = products[products.length - 1];
    return lastProduct ? lastProduct.id + 1 : 1;
  } catch (error) {
    console.error(error);
    return 1;
  }  
}  

router.post('/', async (req, res) => {
  const newProduct = req.body;

  try {
    let products = await getProducts();
    const newId = await getNextProductId();
    const prodGenerated = new productModel(newProduct)  
    await prodGenerated.save()
    res.redirect(`/api/products'${prodGenerated.name}`)
    products.push(newProduct);
    fs.writeFileSync(prodfile, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }  
});  


// router.put('/:pid', (req, res) => {
//   const { pid } = req.params;  
//   const { title, description, code, price, status, stock, category, thumbnails } = req.body;
//   const products = getProducts();
//   const index = products.findIndex(p => p.id === parseInt(pid));

//   if (index === -1) {
//     res.status(404).send('Product not found');  
//   } else {
//     products[index] = {
//       id: parseInt(pid),  
//       title: title || products[index].title,
//       description: description || products[index].description,
//       code: code || products[index].code,
//       price: price || products[index].price,
//       status: status || products[index].status,
//       stock: stock || products[index].stock,
//       category: category || products[index].category,
//       thumbnails: thumbnails || products[index].thumbnails
//     };
//     fs.writeFileSync(prodfile, JSON.stringify(products, null, 2));
//     res.json(products[index]);
//   }
// });

// USING MONGOOSE

router.put('/:pid', async (req, res) => {
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
  res.status(500).send('Internal Server Error');}
});

router.delete('/:pid', async (req, res) => {
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
});



// router.delete('/:pid', (req, res) => {
//   const { pid } = req.params;
//   const products = getProducts();
//   const index = products.findIndex(p => p.id === parseInt(pid));

//   if (index === -1) {
//     res.status(404).send('Product not found');
//   } else {
//     products.splice(index, 1);
//     fs.writeFileSync(prodfile, JSON.stringify(products, null, 2));
//     res.status(204).send();
//   }
// });







export default router;

