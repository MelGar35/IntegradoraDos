import {Router} from 'express'
import productsDao from "../daos/products.dao.js"
import cartDao from "../daos/cart.dao.js"

const router = Router()

router.get('/products', async (req, res) => {

  let limit = 3; 
  let query = req.query.query || null
  let sort = parseInt(req.query.sort)
  let page = parseInt(req.query.page)

  try {
    let result = await productsDao.getProducts(limit, JSON.parse(query), sort, page)
    res.render('products',{result})
  } catch (error) {
    res.json({ message: 'Error, verifique los datos ingresados' })
  }
})

router.get('/carts/:cid', async (req, res) => {

  const cid = (req.params.cid)
  try {
    let result = await cartDao.getCartById(cid)
    console.log(result.products)
    res.render('cart', {result})
  } catch (error) {
    res.json({ error })
  }
})

router.get('/edit/:id', async (req, res) => {
  const product = await productsDao.getById(req.params.id);
  res.render('edit', { title: 'Edit', product });
})

router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
})

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
})

export default router;