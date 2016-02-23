/*global module */
module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            options: {
                separator: ';'
            },
            js: {
                src: [
                    './public/js/**/*.js'
                ],
                dest: 'build/js/all.grunt.js'
            }
        },
        concat_css: {
            options: {},
            all: {
                src: [
                    './public/css/**/*.css'
                ],
                dest: 'build/css/all.grunt.css'
            }
        },
        uglify: {
            scripts: {
                files: [{
                    expand: true,
                    cwd: 'build/js',
                    src: 'all.grunt.js',
                    dest: 'build/js'
                }]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'build/css',
                    src: ['all.grunt.css'],
                    dest: 'build/css',
                    ext: '.min.css'
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
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concat-css');

    grunt.registerTask('default', ['concat', 'uglify', 'concat_css', 'cssmin']);
};
