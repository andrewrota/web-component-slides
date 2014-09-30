module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        clean: {
            dist: ['build'],
            css: ['build/components/**/*.css']
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    src: ['components/**/*.html'],
                    dest: 'build/',
                    cwd: 'src'
                }]
            }
        },
        pkg: grunt.file.readJSON('package.json'),
        inline: {
            dist: {
                src: ['build/**/*.html']
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['components/**/*.scss'],
                    dest: 'build/',
                    ext: '.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-inline');

    grunt.registerTask('default', ['clean:dist', 'copy', 'sass', 'inline', 'clean:css']);

};