const User = require('../models/User');

const { format } = require('date-fns');

exports.getUsersByName = async (name) => {
  const query = name
    ? {
        $or: [
          { username: { $regex: name, $options: 'i' } },
          { email: { $regex: name, $options: 'i' } }
        ]
      }
    : {};

  const users = await User.find(query);

  return users.map(user => ({
    id: user.id,
    username: user.username,
    email: user.email,
    birthdate: format(new Date(user.birthdate), 'yyyy-MM-dd') 
  }));
};


exports.updateUsers = async (users) => {
  const errors = [];

  for (const user of users) {
   
    if (!user.id || !user.username || !user.email || !user.birthdate) {
      errors.push({ id: user.id, error: 'Missing required fields' });
      continue;
    }

   
    const existingUser = await User.findOne({ id: user.id });
    if (!existingUser) {
      errors.push({ id: user.id, error: 'User not found' });
      continue;
    }

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      errors.push({ id: user.id, error: 'Invalid email format' });
      continue;
    }

   
    const birthDateObj = new Date(user.birthdate);
    const today = new Date();

    if (isNaN(birthDateObj.getTime())) {
      errors.push({ id: user.id, error: 'Invalid birthdate format' });
      continue;
    }

    if (birthDateObj >= today) {
      errors.push({ id: user.id, error: 'Birthdate must be in the past' });
      continue;
    }

   
    await User.updateOne({ id: user.id }, { $set: user });
  }

  return {
    success: errors.length === 0,
    errors
  };
};



