const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  let { name, budget } = req.body

  name = name.trim();
	let length = name.length;
  let isNumber = !isNaN(budget);
  let newBudget = parseInt(budget);
	let million = 1000000;

  if ((!name || !budget) || (name === undefined || budget === undefined)) {
    if (budget === null) {
      res.status(400).json({ message: 'budget must be a number' });
    } else {
      res.status(400).json({ message: 'name and budget are required' });
    }
	} else if (length < 3 || length > 100) {
		res
			.status(400)
			.json({ message: 'name of account must be between 3 and 100' });
	} else if (!isNumber) {
		res.status(400).json({ message: 'budget of account must be a number' });
	} else if (newBudget < 0 || newBudget > million) {
		res.status(400).json({
			message: 'budget of account is too large or too small',
		});
	} else {
		next();
	}
  
}

exports.checkAccountNameUniquePost = async (req, res, next) => {
  // DO YOUR MAGIC
  if (req.body.name) {
    req.body.name = req.body.name.trim()
    let accounts = await Accounts.getAll()
    let found = await accounts.find( (account) => {
      if(account.name === req.body.name) {
        return account
      }
    })
    // if found != req.body.name then error out 
    
    if ( found ) {
			res.status(400).json({ message: 'that name is taken' });
		} else {
			next();
		}
  } else {
    res.status(400).json({ message: 'name and budget are required' });
  }
}

exports.checkAccountNameUniquePut = async (req, res, next) => {
	// DO YOUR MAGIC
  let { name } = req.body
  if (name === undefined || !name)  {
		res.status(400).json({ message: 'name and budget are required' });
	} else {
    let nameLength = name.length;
    if (nameLength < 1) {
			res.status(400).json({ message: 'name is required' });
		}
  }
  
  if (req.body.name) {
		req.body.name = req.body.name.trim();
		let accounts = await Accounts.getAll();
		let found = await accounts.find((account) => {
			if (account.name === req.body.name) {
				return account;
			}
		})
    if (found && ((found.name != req.body.name) || (found.id != req.params.id))) {
			res.status(400).json({ message: 'that name is taken' });
		} else {
			next();
		}
	}
};

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id
  
  const [account] = await Accounts.getById(id)
  if (account) { 
    req.account = account
    next()
  } else {
    res.status(404).json({message: 'account not found'})
  }
}
