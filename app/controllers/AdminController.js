const adminService = require('../services/adminService');

class AdminController {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const result = await adminService.login(username, password);
            
            if (result.success) {
                res.json({
                    message: 'Admin login successful',
                    token: result.token
                });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new AdminController();
