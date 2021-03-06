module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-typescript');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        build: {
            root: 'webroot',
            js: 'webroot/js',
            bower: 'bower_components'
        },

        typescript: {
            base: {
                src: ['src/**/*.ts'],
                dest: '<%= build.js %>/<%= pkg.name %>.<%= pkg.version %>.js',
                options: {
                    module: 'amd',
                    target: 'es5',
                    sourcemap: true
                }
            }
        },
        watch: {
            ts: {
                files: ['src/**/*.ts'],
                tasks: ['typescript']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    hostname: "0.0.0.0"
                }
            }
        },
        open: {
            build: {
                path: 'http://localhost:<%= connect.server.options.port %>/<%= build.root %>'
            }
        },

        copy: {
            threejs: {
                files: [
                    {expand: true, cwd: '<%= build.bower %>', src: ['threejs/{build,editor,examples}/**'], dest: '<%= build.root %>/'},
                ]
            }
        }
    });

    grunt.registerTask('default', ['connect:server', 'open:build', 'watch']);
    grunt.registerTask('threejs', ['copy:threejs']);
};

