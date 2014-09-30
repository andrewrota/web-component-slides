module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        clean: {
            start: ['dist'],
            end: ['dist/components/']
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
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: {
                    'dist/slide-content.html': 'dist/components/slide-content/slide-content.html',
                    'dist/slide-show.html': 'dist/components/slide-show/slide-show.html'
                }
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
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('default', ['clean:start', 'copy', 'sass', 'inline', 'htmlmin', 'clean:end',]);

};