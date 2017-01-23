'use strict';

const MAIN_DIR = 'core/src/main/';
const TEST_DIR = 'core/src/test/';
const APPS_MAIN_DIR = 'ui.apps/src/main';
const CONTENT_MAIN_DIR = 'ui.content/src/main';

const constants = {
    VANILLA_CORE_MAIN_SRC_DIR: MAIN_DIR + '/java/com/adobe/aem/core',
    VANILLA_CORE_MAIN_RES_DIR: MAIN_DIR + '/resources/com/adobe/aem/core',
    VANILLA_CORE_TEST_SRC_DIR: TEST_DIR + '/java/com/adobe/aem/core',
    VANILLA_CORE_TEST_RES_DIR: TEST_DIR + '/java/com/adobe/aem/core',

    VANILLA_APPS_MAIN_CONTENT: APPS_MAIN_DIR + '/content',
    VANILLA_APPS_MAIN_JCR_ROOT: APPS_MAIN_DIR + '/content/jcr_root',
    VANILLA_APPS_MAIN_COMPONENTS: APPS_MAIN_DIR + '/content/jcr_root/' + this.appsFolderName + "/components",

    VANILLA_UI_CONTENT_MAIN_CONTENT: CONTENT_MAIN_DIR + '/content',
    VANILLA_UI_CONTENT_MAIN_JCR_ROOT_CONTENT: CONTENT_MAIN_DIR + '/content/jcr_root/content',

    CORE_MAIN_SRC_DIR: MAIN_DIR + 'java/',
    CORE_MAIN_RES_DIR: MAIN_DIR + 'resources/',
    CORE_TEST_SRC_DIR: TEST_DIR + 'java/',
    CORE_TEST_RES_DIR: TEST_DIR + 'resources/',
}

module.exports = constants;