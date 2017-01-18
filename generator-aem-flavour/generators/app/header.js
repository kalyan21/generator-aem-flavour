'use strict'
var chalk = require('chalk');

module.exports = {
    writeHeader
};

function writeHeader(){
    return{
        logo: function(){
            this.log( '\n');
            this.log(chalk.red.bold(' █████╗ ███████╗███╗   ███╗    ')+chalk.cyan.bold('███████╗██╗      █████╗ ██╗   ██╗ ██████╗ ██╗   ██╗██████╗ '));
            this.log(chalk.red.bold( '██╔══██╗██╔════╝████╗ ████║    ')+chalk.cyan.bold('██╔════╝██║     ██╔══██╗██║   ██║██╔═══██╗██║   ██║██╔══██╗'));
            this.log(chalk.red.bold( '███████║█████╗  ██╔████╔██║    ')+chalk.cyan.bold('█████╗  ██║     ███████║██║   ██║██║   ██║██║   ██║██████╔╝'));
            this.log(chalk.red.bold( '██╔══██║██╔══╝  ██║╚██╔╝██║    ')+chalk.cyan.bold('██╔══╝  ██║     ██╔══██║╚██╗ ██╔╝██║   ██║██║   ██║██╔══██╗'));
            this.log(chalk.red.bold( '██║  ██║███████╗██║ ╚═╝ ██║    ')+chalk.cyan.bold('██║     ███████╗██║  ██║ ╚████╔╝ ╚██████╔╝╚██████╔╝██║  ██║'));
            this.log(chalk.red.bold( '╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝    ')+chalk.cyan.bold('╚═╝     ╚══════╝╚═╝  ╚═╝  ╚═══╝   ╚═════╝  ╚═════╝ ╚═╝  ╚═╝'));
            this.log( '\n');
        },

        bottomText: function(){
            this.log(chalk.yellow('\t\t\tCreate project using AEM Flavour yeoman scaffolding\n'));
            this.log(chalk.white('Note:\n'));
            this.log(chalk.red('1.This is developed in java 8. Please download and configure JDK 1.8 \n2.This is developed and tested for AEM 6.2\n'));
        }
        
    }
}