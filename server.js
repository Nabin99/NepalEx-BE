"use strict";
import express from 'express';
import trackingRoute from './routes/tracking.js';
import clientRoute from './routes/client.js';
import shipmentsRoute from './routes/shipments.js';
import employeeRoute from './routes/employee.js';
import exportsRoute from './routes/exports.js';
import importsRoute from './routes/imports.js';
import serviceProviderRoute from './routes/serviceProvider.js';
import loginRoutes from './routes/login.js';
import { authenticateUserToken } from './authentication/userAuth.js';
import cors from 'cors';



const Port = process.env.PORT || 5000;
const app = express();

const corsOptions = {
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200,
}

//cors handling
app.use(cors(corsOptions));


//global middlewares
app.use(express.json());


//routers
app.use('/track', trackingRoute);
app.use('/client', clientRoute);
app.use('/shipment', authenticateUserToken, shipmentsRoute);
app.use('/employee', authenticateUserToken, employeeRoute);
app.use('/exports', authenticateUserToken, exportsRoute);
app.use('/imports', authenticateUserToken, importsRoute);
app.use('/service_provider', authenticateUserToken, serviceProviderRoute);
app.use('/login', loginRoutes);



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