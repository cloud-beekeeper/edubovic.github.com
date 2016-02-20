/*global module */
module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            options: {
                separator: ';'
            },
            main: {
                src: [
                    './public/js/**/*.js'
                ],
                dest: 'build/all.grunt.js'
            }
        },
        uglify: {
            scripts: {
                files: [{
                    expand: true,
                    cwd: 'build',
                    src: 'all.grunt.js',
                    dest: 'build'
                }]
            }
        },
        watch: {
            scripts: {
                files: ['./public/js/**/*.js'],
                tasks: ['default']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat', 'uglify']);
};
