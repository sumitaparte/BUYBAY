module.exports = (app) => {
    let user = require('../controllers/UserManagement.controller.js');

    const cors = require('cors');

    app.use(cors());
    app.get("/getAUser/:id",user.getAUser);
    app.post('/getCurrentUser', user.getCurrentUser);
    
    app.post('/sign-up', user.addUser);

    app.post('/login', user.login);

    app.put('/changePassword', user.changePassword);

    app.put('/forgotPassword', user.forgotPassword);

    app.delete('/deleteUser/:emailId', user.deleteUser);

    app.post('/feedback', user.feedback);
    app.post('/buybay-api/addToFav', user.addToFav);
    app.post('/buybay-api/deleteFav', user.deleteFav);
    app.post('/getFavListingByUser/', user.getFavListingByUser);
}