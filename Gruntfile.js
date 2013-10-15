module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    emberTemplates: {
      compile: {
        options: {
          amd: false,
          templateBasePath: /app\/static\/hbs\//
        },
        files: {
          "app/static/js/result.js": "app/static/hbs/*.handlebars",
        }
      }
    }
});

  grunt.loadNpmTasks('grunt-ember-templates');
  
  grunt.registerTask('default', ['emberTemplates']);

};
