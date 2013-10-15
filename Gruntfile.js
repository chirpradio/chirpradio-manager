module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    handlebars: {
      compile: {
        options: {
          namespace: "App.Templates",
        },
        files: {
          "app/static/js/result.js": "app/static/hbs/*.handlebars"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');
  
  grunt.registerTask('default', ['handlebars']);

};
