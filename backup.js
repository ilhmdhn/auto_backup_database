const moment = require('moment');

const testDate = (dbName) =>{
    try {
        const currentDate = moment();
        const newDate = currentDate.subtract(1, 'days');
        const todayBackup = newDate.format('YYYYMMDD');
        const backupName = `${dbName}_${todayBackup}.sql`;
        console.log(backupName)
    } catch (err) {
        console.log(`
            ERROR
            name: ${err.name}
            message: ${err.message}
            stack: ${err.stack}
        `)
    }
}

testDate('ihp_membership');