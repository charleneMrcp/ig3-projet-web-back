const { Activite } = require('../Models/models');



exports.getAllActivites = async (req, res) => {
  try {
    const activites = await Activite.findAll();
    if (!activites.length) {
      return res.status(404).send({ error: 'No activities found' });
    }
    res.status(200).json(activites);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
}
