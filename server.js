const fs = require('fs');
const logger = require('./logger');
const commander = require('commander');
const streamToBuffer = require('stream-to-buffer');
const SMTPServer = require("smtp-server").SMTPServer;
const simpleParser = require('mailparser').simpleParser;

commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .option('-s, --save', 'Save email output to a JSON file')
  .parse(process.argv);
const options = commander.opts();

const server = new SMTPServer({
    banner: 'Welcome to SMTP Converter',
    logger: logger,
    disabledCommands: ['AUTH'],
    onData(stream, session, callback) {
        streamToBuffer(stream, function(err, buffer) {
            if (err) {
              logger.error(err);
            }
            process(session, buffer, callback);
        });
    }
});
server.listen(587);

function process(session, buffer, callback) {
    const mail = {};
    simpleParser(buffer)
    .then(parsed => {
        mail.id = session.id;
        mail.attachments = parsed.attachments;
        mail.text = parsed.text;
        mail.html = parsed.html;
        mail.to = parsed.to.value;
        mail.from = parsed.from.value;
        // JSON output
        console.log(mail);
        if (options.save) {
            writeToDisk(mail)
        }
        callback(null, "Message queued");
    })
    .catch(err => logger.error(err));
}

function writeToDisk(data) {
    fs.writeFile(`${data.id}.json`, JSON.stringify(data), (err) => {
      if (err) {
        logger.error(err);
      } else {
        logger.info('File written successfully.');
      }
    });
}