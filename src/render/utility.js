const sh = require("shelljs");
const glob = require("glob");
const path = require("path");

export function getArgs() {
    var args = process.argv.splice(process.execArgv.length + 2);
    return args;
}

export function getCurrentDir() {
    var cwd = sh.pwd();
    return cwd + "";
}
