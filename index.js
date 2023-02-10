const fs = require('fs');
const path = require('path');

const exec = require('child_process').exec;

const winston = require('winston');

// Configuring logging
const myFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `************ ${timestamp} ${level}: ************ \n${message}\n************ END ************\n`;
  });

const logger = winston.createLogger({
    level: 'info',
    // format: winston.format.json(),
    format: winston.format.combine(
        winston.format.timestamp(),
        myFormat      
      ),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: './logs/error.log', level: 'error', options: { flags: 'w' }
    }),
      new winston.transports.File({ filename: './logs/combined.log', options: { flags: 'w' }
    }),
    ],
});

logger.add(new winston.transports.Console())

let rawdata = fs.readFileSync('./input/config.json');
let jsonData = JSON.parse(rawdata);


logger.log({
    level: 'info',
    message: JSON.stringify(jsonData, null, 2)
  });

function os_func() {
    this.execCommand = function(cmd, callback) {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                logger.log({
                    level: 'error',
                    message: `exec error: ${error}`
                  });
                return;
            }
            callback(stdout);
        });
    }
}

function safeSuffix (unsafeSuffix) { 
  return path.normalize(unsafeSuffix).replace(/^(\.\.(\/|\\|$))+/, '')
}

function doOne(jsonData) {
  const format  = jsonData.format ? `-f${jsonData.format}` : "";
  const outputFile = `./output/${safeSuffix(jsonData.target)}`;
  const targetFolder = path.dirname(outputFile);
  if (!fs.existsSync(targetFolder)){
    logger.log({
      level: 'info',
      message: `Creating target folder ${targetFolder}`
    });
    fs.mkdirSync(targetFolder);
  }

  const timeWrapper = '/usr/bin/time -f "Processor_metric:{ "ramUsage": { "max_ram":"%M", "unit":"KB" }, "executionTime": {"time":"%e", "unit":"sec"} }"'
  const command = `${timeWrapper} assimp export ./input/${safeSuffix(jsonData.source)} ${outputFile} ${format} `;
  logger.log({
    level: 'info',
    message: "Executing: " + command
  });
  os.execCommand(command, function (returnvalue) {
      logger.log({
          level: 'info',
          message: returnvalue
        });
  });
}


let os = new os_func();

if (Array.isArray(jsonData)) {
  jsonData.forEach(j=>doOne(j))
} else {
  doOne(jsonData);
}


