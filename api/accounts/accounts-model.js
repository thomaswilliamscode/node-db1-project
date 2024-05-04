const db = require('../../data/db-config')


const getAll = async () => {
  // DO YOUR MAGIC
  const accounts = await db('accounts')
  return accounts;
}

const getById = async id => {
  // DO YOUR MAGIC
  const account = await db('accounts').where( 'id', id )
  return account
}

const create = async account => {
  // DO YOUR MAGIC
  const newAccountId = await db('accounts').insert(account)
  const newAccount = await getById(newAccountId)
  return newAccount[0]
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db('accounts').where('id', id).update(account)
  const getNew = await getById(id)
  return getNew[0]

}

const deleteById = async id => {
  // DO YOUR MAGIC
  let deleted = await getById(id)
  await db('accounts').where('id',id).del()
  return deleted
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
