module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    emberTemplates: {
      compile: {
        options: {
          amd: false,
          templateBasePath: /client\/app\/templates\//
        },
        files: {
          "client/app/templates/result.js": "client/app/templates/*.handlebars",
        }
      }
    },
    neuter: {
      options: {
        includeSourceURL: true
      },
      // testing
      'client/test/application.js': 'client/app/application.js',
      // production
      'server/static/js/application.js': 'client/app/application.js'
    },
    qunit: {
      all: {
        options: {
          urls: ['http://localhost:9000/test/runner.html']
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'client'
        },
      }
    },
    build_test_runner_file: {
      all: ['client/test/*_test.js']
    }
  });

  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-neuter');

  grunt.registerMultiTask('build_test_runner_file', 'Creates a test runner file.', function(){
    var template = grunt.file.read('client/test/runner.html.template');
    var renderingContext = {
      data: {
        files: this.filesSrc.map(function(fileSrc){
          return fileSrc.replace('client', '');
        })
      }
    };
    grunt.file.write('client/test/runner.html', grunt.template.process(template, renderingContext));
  }); 

  grunt.registerTask('test', ['emberTemplates', 'build_test_runner_file', 'neuter', 'connect', 'qunit'])
  grunt.registerTask('default', ['emberTemplates', 'neuter']);

};
