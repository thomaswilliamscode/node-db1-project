const router = require('express').Router()

const Accounts = require('./accounts-model')
const Middle = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  const accounts = await Accounts.getAll()
  res.status(200).json(accounts)
})

router.get('/:id', Middle.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.status(200).json(req.account)
})

router.post('/', Middle.checkAccountNameUniquePost, Middle.checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  const newAccount = await Accounts.create(req.body)
  res.status(201).json(newAccount)
})

router.put('/:id', Middle.checkAccountId, Middle.checkAccountNameUniquePut, Middle.checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id
  const updatedAccount = await Accounts.updateById(id, req.body)
  res.status(200).json(updatedAccount)
});

router.delete('/:id', Middle.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id
  const deleted = await Accounts.deleteById(id)
  res.status(200).json(deleted)
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status( err.status || 500).json({
    customMessage: 'Something terrible inside the accounts router',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;
