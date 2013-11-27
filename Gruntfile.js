
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less : {
      prod : {
        options: {
              yuicompress : true
            },
        files: {
          'whip-count.css' : 'src/whip-count.less'
        }
      },
      dev : {
        files: {
          'examples/whip-count.css' : 'src/whip-count.less'
        }
      }
    },
    uglify: {
        prod: {
          options : {
            compress : true,
          },
          files: {
            'whip-count.min.js' : 'src/whip-count.js'
          }
        },
        dev: {
          options : {
            compress : false,
            mangle : false,
            beautify : true
          },
          files: {
            'examples/whip-count.js' : 'src/whip-count.js'
          }
        }
    },
    watch : {
      less : {
        files : ["src/*.less"],
        tasks : ['less:dev']
      }
      ,js : {
        files : ['src/*.js'],
        tasks : ['uglify:dev']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['less:prod']);
  grunt.registerTask('prod', ['less:prod', 'uglify:prod']);

};