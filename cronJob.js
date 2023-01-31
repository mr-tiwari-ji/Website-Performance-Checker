const cron = require('node-cron');

cron.schedule('*/5 * * * *', () => {
  monitorPerformance('https://www.conqt.com/');
});
