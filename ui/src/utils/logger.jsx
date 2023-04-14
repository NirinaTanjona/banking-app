import log from 'loglevel';
const ENV_VAR = process.env.REACT_APP_ENV_VAR
ENV_VAR === 'Production' ? log.setLevel("silent") : log.setLevel("trace");

const logTrace = (msg) => {
    log.trace(msg)
}

const logDebug = (msg) => {
    log.debug(msg)
}

const LogInfo = (msg) => {
    log.info(msg)
}

const logWarn = (msg) => {
    log.warn(msg)
}

const logError = (msg, fulltrace) => {
    log.error(msg + (fulltrace !== undefined ? fulltrace : "" ))
}

const logger = {
    trace: logTrace,
    debug: logDebug,
    info: LogInfo,
    warn: logWarn,
    error: logError
}

export default logger;