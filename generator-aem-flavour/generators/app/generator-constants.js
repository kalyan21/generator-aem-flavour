'use strict';

const MAIN_DIR = 'core/src/main/';
const TEST_DIR = 'core/src/test/';

const constants = {
    VANILLA_CORE_MAIN_SRC_DIR: MAIN_DIR + '/java/com/adobe/aem/core',
    VANILLA_CORE_MAIN_RES_DIR: MAIN_DIR + '/resources/com/adobe/aem/core',
    VANILLA_CORE_TEST_SRC_DIR: TEST_DIR + '/java/com/adobe/aem/core',
    VANILLA_CORE_TEST_RES_DIR: TEST_DIR + '/java/com/adobe/aem/core',

    CORE_MAIN_SRC_DIR: MAIN_DIR + 'java/',
    CORE_MAIN_RES_DIR: MAIN_DIR + 'resources/',
    CORE_TEST_SRC_DIR: TEST_DIR + 'java/',
    CORE_TEST_RES_DIR: TEST_DIR + 'resources/',
}

module.exports = constants;