const express = require('express')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3')
db = new sqlite3.Database('database.db')

app.use(express.json())

const cors = require('cors')
app.use(cors())



app.post("/car", (req, res) => {
    console.log(req.body);

    db.run(

        `
        INSERT INTO carinfo (
            name,
            age,
            phoneNumber,
            vehicle,
            brand,
            model,
            value,
            kmReached,
            carNumber,
            carColor,
            licenceNum,
            carReg,
            newCondition,
            usedCondition,
            startDate,
            endDate,
            insurancePlan,
            insurancePrice
            
        )
            VALUES (
            "${req.body.name}",
            ${req.body.age},
            "${req.body.phoneNumber}",
            "${req.body.vehicle}",
            "${req.body.brand}",
            "${req.body.model}",
            ${req.body.value},
            ${req.body.kmReached},
            "${req.body.carNumber}",
            "${req.body.carColor}",
            "${req.body.licenceNum}",
            ${req.body.carReg},
            "${req.body.newCondition}",
            "${req.body.usedCondition}",
            "${req.body.startDate}",
            "${req.body.endDate}",
            "${req.body.insurancePlan}",
            "${req.body.insurancePrice}"

            )
        `, () => {res.send("Values were stored successfully!")}
    )

})



app.get("/showcar", (req, res) => {
    console.log(req.body);

    db.all(

        `
        SELECT * FROM carinfo
        `, (error, info) => {res.send(info)}
    )
    
})



app.listen(port, () => {
    console.log(`This app is listening to port ${port}`);
})