module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        clean: {
            dist: ['dist'],
            css: ['dist/components/**/*.css']
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    src: ['components/**/*.html'],
                    dest: 'dist/',
                    cwd: 'src'
                }]
            }
        },
        pkg: grunt.file.readJSON('package.json'),
        inline: {
            dist: {
                src: ['dist/**/*.html']
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['components/**/*.scss'],
                    dest: 'dist/',
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