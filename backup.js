const { exec } = require('child_process');
const moment = require('moment');
const fs = require('fs/promises')
const config = '/home/usersrvc/file/db_config.cfg';

const dir = '/ssdext/backup_database';

module.exports = (dbName) =>{
    try {
        const currentDate = moment();
        const newDate = currentDate.subtract(1, 'days');
        const todayBackup = newDate.format('YYYYMMDD');
        const backupName = `${dbName}_${todayBackup}.sql`;
        const destinationBackup = `${dir}/${backupName}`;
        const backupSyntax = `mysqldump --defaults-extra-file=${config} ${dbName} > ${destinationBackup}`;

        console.log('EXECUTE BACKUP '+backupSyntax);

        exec(backupSyntax, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.error(`mysqldump stderr: ${stderr}`);
              return;
            }
            console.log(`Backup berhasil: ${destinationBackup}`);
            removeOldDatabase(dbName);
          });


    } catch (err) {
        console.log(`
        ERROR BACKUP DATABASES
            name: ${err.name}
            message: ${err.message}
            stack: ${err.stack}
        `)
    }
}

const removeOldDatabase = async(databaseName) =>{
    try{
        const currentDate = moment();
        const dateDelete = currentDate.subtract(8, 'days');
        const todayremove = dateDelete.format('YYYYMMDD');
        const removePath = `${dir}/${databaseName}_${todayremove}.sql`;
        console.log('REMOVE old backup '+removePath);
        
        await fs.stat(removePath);
        await fs.unlink(removePath);
        console.log('SUCCESS REMOVE OLD BACKUP '+removePath);
    }catch(err){
        if (err.code === 'ENOENT') {
            console.log('OLD Backup tidak ada');
            return
        }
        throw err
    }
}
