
const Roles_Policy = {
    User: [
        'GET/client/:emailId',
        'GET/track/'

    ],
    CustomerCare: [

    ],
    Shipments: [

    ],
    Imports: [

    ],
    Exports: [

    ],
    Accounts: [

    ],
    AccountsHead: [

    ],
    Manager: [

    ]

}

const authorizeAccess = (req, res, next) => {
    try {
        const requestedRoute = req.method + req.baseUrl + req.route.path;
        const userAccessLevel = req.body.access || req.body.department;
        console.log(requestedRoute, userAccessLevel, Roles_Policy[userAccessLevel].includes(requestedRoute))
        if (Roles_Policy[userAccessLevel].includes(requestedRoute))
            next();
        else
            res.sendStatus(401);
    }
    catch {
        res.sendStatus(401);
    }

}

export default authorizeAccess;