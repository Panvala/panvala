const reporter = require("cucumber-html-reporter");

const options = {
    name: 'Panvala web tests',
    theme: 'bootstrap',
    jsonFile: process.cwd() + '/report.json',
    output: process.cwd() + '/report/report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true
};

reporter.generate(options);
