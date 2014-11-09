module.exports = function(grunt){
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        cmq: {
            options: {
                log: false
            },
            your_target:{
                files:{
                    'stylesheets/tmp' : ['stylesheets/*.css']
                }
            }
        },
        
        concat: {
            dist:{
                src: [
                    'js/main.js',
                    'js/vendor/orbitcontrols.min.js'
                ],
                
                dest : 'js/build/production.js',
            }
        },
        
        sass: {                              
            dist: { 
                options:{
                    style : 'compressed'   
                },
                
                files: {
                    'stylesheets/main.css': 'stylesheets/main.scss',
                    'stylesheets/modal.css': 'stylesheets/modal.scss'
                }
            }
        },
        
        watch: {
            
            options:{
                livereload : true,
            },
        
            scripts:{
                files: ['js/*.js'],
                tasks: ['concat'],
                options:{
                    spawn: false,
                }
            },
        
            css:{
                files: ['stylesheets/main.scss', 'stylesheets/modal.scss'],
                tasks: ['sass'],
                options:{
                    spawn: false,
                }
            }, 
            
            cmq:{
                files:['stylesheets/*.css'],
                tasks: ['cmq'],
                options:{
                    spawn: false,
                }
            }
        }
        
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-combine-media-queries');

    grunt.registerTask('default', ['concat', 'sass', 'cmq']);
    
};