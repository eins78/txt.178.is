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
      publishPages: {
        command: 'cd gh-pages && git push origin gh-pages'
      },
      commitPages: {
        command: 'cd gh-pages && git add . && git commit -m "output for <%= githash %>"'
      },
      clonePages: {
        command: 'git clone git@github.com:eins78/txt.178.is.git gh-pages && cd gh-pages && git checkout gh-pages'
      }
    },
    
    revision: {
      options: {
        property: 'githash',
        ref: 'HEAD',
        short: true
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
  grunt.loadNpmTasks('grunt-git-revision');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['auto']);
  grunt.registerTask('build', ['shell:build']);
  grunt.registerTask('buildDev', ['shell:buildDev']);
  grunt.registerTask('auto', ['buildDev', 'connect', 'watch']);
  grunt.registerTask('deploy', ['build', 'revision', 'shell:commitPages', 'shell:publishPages']);
  grunt.registerTask('ci', ['shell:clonePages', 'deploy']);
  

};