import {Router } from 'express'
import {addProduct, searchProductsByName, FilterProducts, GetProductsInRange} from '../controllers/productsController'


const productRouter = Router()

productRouter.post("", addProduct)




productRouter.get("/search",searchProductsByName)
productRouter.get("/filter",FilterProducts)
productRouter.get("/GetProductsInRange",GetProductsInRange)



export default productRouter