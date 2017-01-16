'use strict';

const mkdirp = require('mkdirp');
const constants = require('./generator-constants');

module.exports = {
    writeFiles
};

function writeFiles() {
    return {

        setUpJavaDir() {
            javaDir = this.javaDir = constants.SERVER_MAIN_SRC_DIR + this.packageFolder + '/';
        },

        writeGlobalFiles: function () {
            this.copy('README.md', 'README.md');
            this.copy('.gitignore', '.gitignore');
            this.template('_pom.xml', 'pom.xml');
        },
        
        
        writeCoreFolderAndPom: function () {

            // Create core folder
            mkdirp("core");
            this.template('core/_pom.xml', 'core/pom.xml');

        }


    }
}
