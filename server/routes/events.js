const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middleware/auth');


router.get('/events', async (req, res) => {
  try {
    const getEvents = await pool.query(
      'SELECT * FROM events ORDER BY date ASC'
    );
    res.status(200).json(getEvents.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/events/:id', async(req,res) =>
{
     const { id } = req.params; 

    
    try{
        const findEvent = await pool.query(
        'SELECT * FROM events WHERE id = $1',[id]
    );


    if (!findEvent.rows[0]) {
  return res.status(404).json({ message: 'Event not found' });
}
res.status(200).json(findEvent.rows[0]);
    }catch(err)
    {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
  
});



module.exports = router;