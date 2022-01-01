import express from 'express';
import authorizeAccess from '../authorization/authorizationPolicy.js';

const router = express.Router();

router.get('/', authorizeAccess, (req, res) => {
    console.log(req.headers)
    res.send('This is the tracking route');
});

export default router;