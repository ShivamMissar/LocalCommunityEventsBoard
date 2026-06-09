const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middleware/auth');

// GET    /events          ← get all events (public)
// GET    /events/:id      ← get single event (public)
// POST   /events          ← create event (protected)
// PUT    /events/:id      ← update event (protected)
// DELETE /events/:id      ← delete event (protected)

//get all events
router.get('/', async (req, res) => {
    try {
        const getEvents = await pool.query(
            'SELECT events.*, COUNT(rsvps.id) as rsvp_count FROM events LEFT JOIN rsvps ON events.id = rsvps.event_id GROUP BY events.id ORDER BY date ASC'
        );
        if(getEvents.rows.length === 0)
        {
            return res.status(404).json({message: 'No events upcoming!'})
        }
        res.status(200).json(getEvents.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/my-events', authenticateToken, async (req, res) => {
    try {

        const userId = req.user.userId; 

        const getEvents = await pool.query(
            'SELECT * FROM events WHERE user_id = $1 ORDER BY date ASC', [userId]
        );
        if(getEvents.rows.length === 0)
        {
            return res.status(404).json({message: 'No events upcoming!'})
        }
        res.status(200).json(getEvents.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
// get a single event by searching
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const findEvent = await pool.query(
            'SELECT * FROM events WHERE id = $1', [id]
        );


        if (!findEvent.rows[0]) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(findEvent.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }

});

//post a event 
router.post('/', authenticateToken, async (req, res) => {

    try {
        const { title, description, category, location, date, image_url } = req.body;
        if (!title || !location || !date) {
            return res.status(400).json({ message: 'Must require the title, location and date of the event to be created' });
        }

        const createEvent = await pool.query(

            'INSERT INTO events(title,description, category, location,date,image_url, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [title, description, category, location, date, image_url, req.user.userId]
        )
        return res.status(200).json(createEvent.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// update the created event by the user
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { title, description, category, location, date, image_url } = req.body;
        const { id } = req.params;

        if (!title || !location || !date) {
            return res.status(404).json({ message: 'Must require the title, location and date of the event to be created' });
        }

        const updateEvent = await pool.query(
            'UPDATE events SET title = $1, description = $2, category = $3, location = $4, date = $5, image_url = $6 WHERE id= $7 AND user_id = $8 RETURNING *',
            [title, description, category, location, date, image_url, id, req.user.userId]
        )

        return res.status(200).json(updateEvent.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });


    }
});


//delete an event
router.delete('/:id', authenticateToken, async (req, res) => {

    try {

        const { id } = req.params;
        const deleteEvent = await pool.query(
            'DELETE FROM events WHERE id = $1 AND user_id = $2', [id, req.user.userId]
        );

        return res.status(200).json({ message: 'Event deleted successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

//rsvp to an event 

router.post('/:id/rsvp', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;  // this is the event_id
    const userId = req.user.userId;

    const saveRsvp = await pool.query(
      'INSERT INTO rsvps (user_id, event_id) VALUES ($1, $2) RETURNING *',
      [userId, id]
    );

    return res.status(201).json({ message: 'RSVP successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;