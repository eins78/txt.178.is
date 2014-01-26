module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    "input": "Digital-Activism.page",
    "output": "gh-pages/Talk/Digital-Activism",
    "pandocOpts": "--smart --section --template=\"_template.html\" --css=\"style.css\"",

    shell: {
      options: {
        stdout: true,
        failOnError: true
      },
      build: {
        command: 'pandoc -f markdown -t revealjs -i "<%= input %>" -o "<%= output %>.html" <%= pandocOpts %>',
      },
      buildBundle: {
        command: 'pandoc -f markdown -t revealjs --self-contained -i "<%= input %>" -o "<%= output %>.bundle.html" <%= pandocOpts %>',
      },
      buildDev: {
        command: 'pandoc -t html5 -i "<%= input %>" -o "<%= output %>.html" <%= pandocOpts %>',
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
  grunt.registerTask('deploy', ['build', 'shell:buildBundle', 'revision', 'shell:commitPages', 'shell:publishPages']);
  grunt.registerTask('ci', ['shell:clonePages', 'deploy']);
  

};