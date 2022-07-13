var dbService = require('../dbService');

class HomeController { 
    async index (req, res) {
        const { user } = req.session;
        try {
            
        } catch (error) {
            console.log(error);
        }
        return res.render('home', {list: null, user: user});
    }
}

module.exports = HomeController;