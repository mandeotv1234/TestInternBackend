const jwt = require('jsonwebtoken');
require('dotenv').config();

class AdminService {
    async login(username, password) {
        const adminUsername = process.env.ADMIN_USERNAME ;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (username === adminUsername && password === adminPassword) {
            const token = jwt.sign(
                { username: username, role: 'admin' },
                process.env.JWT_SECRET ,
                { expiresIn: '1h' }
            );
            return { success: true, token };
        }
        return { success: false };
    }
}

module.exports = new AdminService();
