'use strict';

// imports
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    exec = require('child_process').exec,
    through = require('through2'),
    path = require('path'),
    gutil = require('gulp-util'),
    mkdirp = require('mkdirp'),
    colors = require('colors');

// constants
var source = 'src/**/*.escad',
    target = 'build',
    extopenscadPath = '~/.cabal/bin/extopenscad'; // TODO should be extopenscad
    
var extopenscad = function extopenscad(options, sync) {
    return through.obj(function(file, enc, cb) {
        var filePath = file.path;
        var fileRelative = file.relative;
        var fileDirname = path.dirname(fileRelative);
        var fileName = path.basename(filePath);
        // create output path
        var outName = gutil.replaceExtension(fileName, '.stl');
        var outDirname = path.join(target, fileDirname);
        mkdirp(outDirname, function() {
            var outPath = path.join(outDirname, outName);
            var command = extopenscadPath + ' -o ' + outPath + ' ' + filePath;
            // execute extopenscad
            console.log(command.green);
            exec(command, function(err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                cb(null, file);
            });
        });
    });
}

gulp.task('default', function() {
    return gulp.src(source)
        .pipe(watch(source))
        .pipe(extopenscad());
});

