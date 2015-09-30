module.exports = function(grunt){
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {  
        	options: {
        		separator: ';\n'
        	}, 
		    build: {
		        src: [
		            'dev/core/dyna-icons.js',
		            'dev/vendor/*.js',
		            'dev/core/core.js' 
		        ],
		        dest: 'dist/js/build.js',
		    },
		    d3: {
		        src: [
		            'dev/assets/d3_2.7.0/d3.min.js',
		            'dev/assets/d3_2.7.0/d3.csv.min.js',
		            'dev/assets/d3_2.7.0/d3compat.min.js',
		            'dev/assets/d3_2.7.0/circle_packer_movers.js' 
		        ],
		        dest: 'dist//js/d3.build.js',
		    }
		},

		uglify: {
		    build: {
		        src: 'dist/js/build.js',
		        dest: 'dist/js/build.min.js'
		    },
		    d3: {
		        src: 'dist/js/d3.build.js',
		        dest: 'dist/js/d3.build.min.js'
		    },
		    tools: {
		    	files: [{
		    		expand:true,
		    		cwd: 'dev/tools/',
		    		src:['*.js'],
		    		dest: 'dist/tools/',
		    		ext: '.js'
		    	}]
		    }
		},

		cssmin: {
		   dist: {
			    files: {
			         'dist/css/style.min.css': [
			         	'dev/core/css/dyna.css',
			         	'dev/css/typeahead.min.css',
			         	'dev/css/tipsy.css',
			         	'dev/css/nouislider.min.css',
			         	'dev/css/style.css'
			         ]
			    }
		  }
		},

		clean: {
			js: ['dist/js/*.js', '!dist/js/*.min.js']
		},

		copy: {
				tools: {
					expand: true,
					cwd: 'dist/',
					src: ['**'],
					dest: 'html/dist/'
					
				},
				includes: {
					expand: true,
					cwd: 'includes/',
					dest: 'html/includes/',
					src: ['**']
				},
				data: {
					expand: true,
					cwd: 'data/',
					dest: 'html/data/',
					src: ['**']
				},
				index: {
					src: ['index.htm'],
					dest: 'html/'
				}
		},

		jshint: {
			options: {
	            reporter: require('jshint-stylish')
	        },
			tools : ['dist/tools/*.js']
		},

		imagemin:{
			png:{
				options:{
					optimizationLevel: 7
				},
				files: [
					{
						expand: true,
						cwd: 'dev/images/',
						src: ['**/*.png'],
						dest: 'dist/images/',
						ext: '.png'
					}
				]
			},
			jpeg:{
				options:{
					progressive:true
				},
				files:[
					{
						expand: true,
						cwd: 'dev/images/',
						src: ['**/*.jpg'],
						dest: 'dist/images/',
						ext: '.jpg'	
					}
				]
			}
		}
    });

    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'clean']);
    grunt.registerTask('publish', ['default', 'imagemin', 'copy']);
    grunt.registerTask('imageUpdates', ['imagemin']);

};