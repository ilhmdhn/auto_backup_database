const backup = require('./backup');

    try {
        backup('ihp_membership');
        backup('ihp_transaction');
        backup('ihp_vod_monitor');
        backup('ihp_report');
    } catch (err) {
        console.log(`
            ERROR
            name: ${err.name}
            message: ${err.message}
            stack: ${err.stack}
        `)
    }