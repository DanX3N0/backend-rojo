import { Router } from 'express';
import { get, getAll, post, put, deleted } from '../e-comerce/controller/products.controller';

const router = Router()

router.get('/',get)
router.get('/:id',getAll)
router.post('/',post)
router.put('/:id',put)
router.delete('/:id',deleted)

export{router}