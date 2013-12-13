module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    "input": "Was-ist-das-Internetz.md",
    "output": "gh-pages/Talk/Was-ist-das-Internetz.html",
    "pandocOpts": "--smart --self-contained --section --template=_template.html",
    
    shell: {
      options: {
        stdout: true,
        failOnError: true
      },
      build: {
        command: 'pandoc -t revealjs -i "<%= input %>" -o "<%= output %>" <%= pandocOpts %>',
      },
      buildDev: {
        command: 'pandoc -t html5 -i "<%= input %>" -o "<%= output %>" <%= pandocOpts %>',
      },
      publish: {
        command: 'git push github gh-pages'
      },
      clonePages: {
        command: 'git clone git@github.com:eins78/txt.178.is.git gh-pages'
      }
    },
    
    watch: {
      scripts: {
        files: ['*.md', '*.page', 'template.html'],
        tasks: ['buildDev'],
        options: {
          spawn: false,
          livereload: true
        },
      },
    },
    
    connect: {
      server: {
        options: {
          port: 3003,
          hostname: 'localhost',
          livereload: true,
          open: true
        }
      }
    }
    
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['auto']);
  grunt.registerTask('build', ['shell:build']);
  grunt.registerTask('buildDev', ['shell:buildDev']);
  grunt.registerTask('auto', ['buildDev', 'connect', 'watch']);
  grunt.registerTask('deploy', ['build', 'shell:publish']);

};