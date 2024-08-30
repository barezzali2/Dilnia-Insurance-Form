const sqlite3 = require('sqlite3')
db = new sqlite3.Database('database.db')



db.run(

    `
    CREATE TABLE carinfo (
    [id] INTEGER PRIMARY KEY,
    [name] NVARCHAR(255),
    [age] INTEGER,
    [phoneNumber] NVARCHAR(255),
    [vehicle] NVARCHAR(255),
    [brand] NVARCHAR(255),
    [model] NVARCHAR(255),
    [value] INTEGER,
    [kmReached] INTEGER,
    [carNumber] NVARCHAR(255),
    [carColor] NVARCHAR(255),
    [licenceNum] NVARCHAR(255),
    [carReg] INTEGER,
    [newCondition] NVARCHAR(255),
    [usedCondition] NVARCHAR(255),
    [startDate] NVARCHAR(255),
    [endDate] NVARCHAR(255),
    [insurancePlan] NVARCHAR(255),
    [insurancePrice] NVARCHAR(255)
    )
   
    `
)