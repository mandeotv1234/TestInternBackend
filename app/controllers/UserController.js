const userService = require('../services/userService');

exports.getUsers = async (req, res) => {
  try {
    const name = req.query.name || '';
    const users = await userService.getUsersByName(name);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUsers = async (req, res) => {
  try {
    const users = req.body;
    
    const result = await userService.updateUsers(users);
  
    if (!result.success) {
      return res.status(400).json({
        message: 'Some users could not be updated',
        errors: result.errors
      });
    }

    res.json({ message: 'All users updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

