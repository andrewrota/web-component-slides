module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        clean: {
            start: ['dist/'],
            end: ['dist/components/']
        },
        copy: {
            distHtml: {
                files: [{
                    expand: true,
                    src: ['components/**/*.html'],
                    dest: 'dist/',
                    cwd: 'src'
                }]
            },
            distJs: {
                files: [{
                    flatten: true,
                    expand: true,
                    src: ['components/**/*.js'],
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
        jshint: {
            all: ['src/**/*.js', 'Gruntfile.js'],
            options: {
                jshintrc: true
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
        },
        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: '**/*.js',
                    dest: 'dist'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-inline');

    grunt.registerTask('default', ['jshint', 'clean:start', 'copy:distHtml', 'sass', 'inline', 'htmlmin', 'copy:distJs', 'uglify', 'clean:end', ]);

};