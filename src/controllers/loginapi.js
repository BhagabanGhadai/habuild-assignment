const client = require("../postgres");
const jwt = require("jsonwebtoken");

//Registration Function

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const data = await client.query('SELECT * FROM users WHERE email= $1;', [email]);

        if (!data.rows.length) {
            let saveInDb = await client.query(`INSERT INTO users (name, email,password) 
            VALUES ($1,$2,$3);`, [name, email, password]);
            const userData = await client.query('SELECT * FROM users WHERE email= $1 AND password=$2;', [email, password]);
            if (userData.rows.length == 1) {
                let userId = userData.rows[0].id
                const token = jwt.sign({
                    userId: userId,
                    email: userData.rows[0].email,
                }, 'BYRD87KJVUV%^%*CYTC', { expiresIn: '3d' })
                return res.status(200).send({ message: 'user created successful', token: token })
            } else {
                return res.status(404).send({ error: "No Such User Found" });
            }
        } else {
            return res.status(400).send({ error: "Email already there, No need to register again." });
        }
    }
    catch (err) {
        res.status(500).send({ data: "Database error while registring user!", error: err });
    };
}

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
const getUser = async (req, res) => {
    try {
        const userIdFromToken = req.userId
        const userIdFromParams = req.params.Id
        if (userIdFromParams != userIdFromToken) {
            return res.status(403).send({ status: false, message: "You Are Not Authorized!!" })
        }
        const data = await client.query('SELECT * FROM users WHERE id= $1;', [userIdFromParams]);
        return res.status(200).send({ status: true, msg: "User found Successful!!", data: data.rows })


    } catch (err) {
        res.status(500).send({ data: "Database error while registring user!", error: err });
    }
}

module.exports = { register, getUser }