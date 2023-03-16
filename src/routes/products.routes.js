import { Router } from "express"
import { uploader } from "../utils/multer.js"
import productsDao from "../daos/products.dao.js"
import {productModel} from "../models/products.models.js"
import passport from "passport"


const router = Router()

//metodo get para traer todos los productos

router.get('/', passport.authenticate("jwt", {session:false}), async (req, res) => {

  let limit = parseInt(req.query.limit)
  let query = req.query.query || null
  let sort = parseInt(req.query.sort)
  let page = parseInt(req.query.page)

  try {
    let result = await productsDao.getProducts(limit, JSON.parse(query), sort, page)
    res.json(
      {
        status: 'success',
        payload: result,
      })
  } catch (error) {
    res.json({ error })
  }
})

//metodo para traer producto por id


router.get('/:pid', async (req, res) => {
  let pid = (req.params.pid);
  try {
    res.json(await productsDao.getProductById(pid))
  } catch (error) {
    res.json({ error })
  }
})

router.post('/', uploader.single('thumbnail'), async (req, res) => {
  const { title, description, category, price, thumbnail, code, stock } = req.body;
  try {
    let createdProduct = await productsDao.createProduct({
      title, description, category, price, thumbnail, code, stock
    })
    res.status(201).json({ info: 'Producto Agregado', createdProduct })
  } catch (error) {
    console.log("Ha ocurrido un error: \n", error)
    res.status(400).json({ info: `Ha ocurrido un error: ${error}` })
  }
})

router.put('/:pid', async (req, res) => {
  const pid = (req.params.pid)
  const updatedValue = req.body
  try {
    await productsDao.updateProduct(pid, updatedValue)
    res.send({ status: 200, payload: updatedValue })
  } catch (error) {
    res.json({ error })
  }
})

router.delete('/:pid', async (req, res) => {
  let pid = (req.params.pid)
  try {
    await productsDao.deleteProduct(pid)
    res.json({ status: 200, message: 'Producto eliminado' })
  } catch (error) {
    res.json({ error })
  }
})

export default router;