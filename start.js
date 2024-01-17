const schedule = require('node-schedule');
const moment = require('moment');

schedule.scheduleJob('0 4 * * *', () => {
    try {
        const currentDate = moment();
        const newDate = currentDate.subtract(1, 'days');
        const formattedDate = newDate.format('YYYYMMDD');
        console.log(formattedDate)
    } catch (err) {
        console.log(`
            ERROR
            name: ${err.name}
            message: ${err.message}
            stack: ${err.stack}
        `)
    }
});

// execute()