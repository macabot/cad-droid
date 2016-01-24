'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    exec = require('child_process').exec,
    through = require('through2'),
    path = require('path'),
    gutil = require('gulp-util'),
    mkdirp = require('mkdirp');

var source = 'src/**/*.escad',
    target = 'build',
    extopenscadPath = '~/.cabal/bin/extopenscad'; // TODO should be extopenscad
    
var extopenscad = function extopenscad(options, sync) {
    return through.obj(function(file, enc, cb) {
        var filePath = file.path;
        var fileRelative = file.relative;
        var fileDirname = path.dirname(fileRelative);
        var fileName = path.basename(filePath);
        
        var outName = gutil.replaceExtension(fileName, '.stl');
        var outDirname = path.join(target, fileDirname);
        mkdirp(outDirname, function() {
            var outPath = path.join(outDirname, outName);
        
//            console.log(filePath, fileRelative, fileDirname, fileName, outPath);
            exec(extopenscadPath + ' -o ' + outPath + ' ' + filePath, function(err, stdout, stderr) {
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

/*
gulp.task('default', ['watch']);

gulp.task('extopenscad', function(cb) {
    console.log(arguments);
    exec('echo "hello world"', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

//gulp.watch(source, ['extopenscad']);

function extopenscad(cb) {
    console.log(arguments);
    console.log(cb);
}

gulp.task('watch', function() {
    gulp.watch(source, ['extopenscad']);
});


gulp.task('default', function() {
    return gulp.src(source)
        .pipe(watch(source))
        .pipe(extopenscad);
});

*/

