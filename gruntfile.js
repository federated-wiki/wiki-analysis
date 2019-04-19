module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-run');

  grunt.initConfig({
    coffee: {
      client: {
        expand: true,
        options: {
          sourceMap: true
        },
        src: ['*.coffee'],
        ext: '.js'
      }
    },

    run: {
      tool: { cmd: "node", args: ["index.js"] }
    },

    watch: {
      all: {
        files: ['*.coffee', '*.js'],
        tasks: ['run:tool']
      }
    }
  });

  grunt.registerTask('default', ['run:tool']);

};
