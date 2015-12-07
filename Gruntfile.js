'use strict';

module.exports = function(grunt) {

  var options = {
    config: {
      src: 'grunt/*.js'
    }
  };

  var configs = require('load-grunt-configs')(grunt, options);
  grunt.initConfig(configs);

  grunt.registerTask('make', function(target) {
    grunt.task.run([
      'clean:dist'
    ]);
  });

  grunt.registerTask('build', function() {
    grunt.task.run('make:dev');
    grunt.task.run('concurrent:watch');
  });

  grunt.registerTask('default', 'build');
  grunt.registerTask('lint', ['jshint', 'eslint']);
  require('load-grunt-tasks')(grunt);
};
