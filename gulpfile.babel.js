import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import serve from 'gulp-serve';
import mocha from 'gulp-mocha';

gulp.task('js:build', () => {
    return browserify({ entries: './src/app.js', debug: true })
        .transform(babelify)
        .bundle()
        .on('error', function(error) {
          console.error(error.stack);
          this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', ['js:build'], () => {
    gulp.watch('src/**/*.js', ['js:build']);
});

gulp.task('test', () => {
    gulp.src('test/**/*_spec.js', { read: false })
        .pipe(mocha({ reporter: 'dot' }));
});

gulp.task('serve', serve({ root: 'dist', port: 8000 }));

gulp.task('default', ['watch', 'serve']);
