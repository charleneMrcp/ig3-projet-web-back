const { Activite } = require('../Models/models');



exports.getAllActivites = async (req, res) => {
    try {
        const activites = await Activite.findAll();
        res.json(activites);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      }
}