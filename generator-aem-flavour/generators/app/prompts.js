'use strict';

var chalk = require('chalk');

module.exports = {
    askForGroupId,
    askForArtifactId,
    askForVersion,
    askForPackage,
    askForAppsFolderName,
    askForArtifactName,
    askForComponentGroupName,
    askForContentFolderName,
    askForPackageGroup,
    askForSiteName
}

function askForGroupId() {
    var done = this.async();
    this.prompt({
        type: 'input',
        name: 'groupId',
        message: 'Provide ' + chalk.green('group Id') + ' for your application',
        default: 'com.mycompany'
    }).then(function (prompt) {
        this.groupId = prompt.groupId;
        done();
    }.bind(this));
}

function askForArtifactId() {
    var done = this.async();
    this.prompt({
        type: 'input',
        name: 'artifactId',
        message: 'Provide ' + chalk.green('artifact Id') + ' for your application',
        default: 'myapp'
    }).then(function (prompt) {
        this.artifactId = prompt.artifactId;
        done();
    }.bind(this));
}

function askForVersion() {
    var done = this.async();
    this.prompt({
        type: 'input',
        name: 'version',
        message: 'Provide ' + chalk.green('snapshot version') + ' for your application',
        default: '1.0'
    }).then(function (prompt) {
        this.version = prompt.version;
        done();
    }.bind(this));
}

function askForDescription() {
    var done = this.async();
    this.prompt({
        type: 'input',
        name: 'description',
        message: 'Provide ' + chalk.green('description') + ' for your application',
        default: 'Project description'
    }).then(function (prompt) {
        this.description = prompt.description;
        done();
    }.bind(this));
}

function askForPackage() {
    var done = this.async();
    this.prompt({
        type: 'input',
        name: 'packageName',
        message: 'Provide ' + chalk.green('java package name') + ' for your application',
        default: 'com.myapp'
    }).then(function (prompt) {
        this.packageName = prompt.packageName;
        done();
    }.bind(this));
}

function askForAppsFolderName() {
    var done = this.async();
    this.prompt({
        type: 'input',
        name: 'appsFolderName',
        message: 'Provide ' + chalk.green('application folder name'),
        default: 'myapp'
    }).then(function (prompt) {
        this.appsFolderName = prompt.appsFolderName;
        done();
    }.bind(this));
}

function askForArtifactName() {
    var done = this.async();
    this.prompt({
        type: 'input',
        name: 'artifactName',
        message: 'Provide ' + chalk.green('artifact name') + ' for your application ',
        default: 'My App'
    }).then(function (prompt) {
        this.artifactName = prompt.artifactName;
        done();
    }.bind(this));
}

function askForComponentGroupName() {
    var done = this.async();
    this.prompt({
        type: 'input',
        name: 'componentGroupName',
        message: 'Provide ' + chalk.green('component group name') + ' for your application ',
        default: 'My-App'
    }).then(function (prompt) {
        this.componentGroupName = prompt.componentGroupName;
        done();
    }.bind(this));
}

function askForContentFolderName() {
    var done = this.async();
    this.prompt({
        type: 'input',
        name: 'contentFolderName',
        message: 'Provide ' + chalk.green('content folder name') + ' for your application ',
        default: 'myapp'
    }).then(function (prompt) {
        this.contentFolderName = prompt.contentFolderName;
        done();
    }.bind(this));
}

function askForPackageGroup() {
    var done = this.async();
    this.prompt({
        type: 'input',
        name: 'packageGroup',
        message: 'Provide ' + chalk.green('package group name') + ' for your application ',
        default: 'My App'
    }).then(function (prompt) {
        this.packageGroup = prompt.packageGroup;
        done();
    }.bind(this));
}

function askForSiteName() {
    var done = this.async();
    this.prompt({
        type: 'input',
        name: 'sitename',
        message: 'Provide ' + chalk.green('site name') + ' for your application ',
        default: 'My App'
    }).then(function (prompt) {
        this.sitename = prompt.sitename;
        done();
    }.bind(this));
}

