db.createUser(
    {
        user: "pc",
        pwd: "Passw0rd",
        roles: [
            {
                role: "readWrite",
                db: "projeto-celo"
            }
        ]
    }
);