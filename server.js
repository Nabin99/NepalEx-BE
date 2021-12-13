import express from 'express';
import trackingRoute from './routes/tracking.js';
import clientRoute from './routes/client.js';
import shipmentsRoute from './routes/shipments.js';

const Port = process.env.PORT || 5000;
const app = express();


//cors handling
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});


//global middlewares
app.use(express.json());


//routesrs
app.use('/track', trackingRoute);
app.use('/client', clientRoute);
app.use('/shipment', shipmentsRoute);



//root route
app.get('/', (req, res) => {
    res.send(`<div style="
    color:orange;
    width:100%;
    height:98vh;
    display:flex;
    justify-content:center;
    align-items:center;
    ">
    <h1>Welcome to the Nepal Express Organization!</h1>
    </div>`
    );
});
app.listen(Port, () => console.log(`listening from port ${Port}.....`));