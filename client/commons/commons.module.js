'use strict';

import angular from 'angular';

require('./common.css');

import CommonJqueryWrapModule from './jquery.wrap/jquery.wrap.common.module';
import CommonDirectivesModule from './directives/directives.common.module';
import CommonD3Module from './d3/d3.common.module';
import CommonUtilsModule from './utils/utils.common.module';

export default angular
    .module('commons.module', [CommonDirectivesModule, CommonD3Module, CommonUtilsModule, CommonJqueryWrapModule])
    .name;