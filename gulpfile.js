const gulp = require('gulp')
const path = require('path')
const del = require('del')
const ts = require('gulp-typescript')

const root = __dirname

const packages = [
  'circe-body-parser',
  'circe-checker',
  'circe-config',
  'circe-cors',
  'circe-jwt',
  'circe-on-error',
  'circe-response',
  'circe-unless',
  'circe-combine-routers'
]

function getPackageRoot (name) {
  return path.resolve(root, 'packages', name)
}

packages.forEach((package) => {
  gulp.task(`build:${package}`, function () {
    const packageRoot = getPackageRoot(package)
    const project = ts.createProject(path.join(packageRoot, 'tsconfig.json'), {typeRoots: [path.join(packageRoot, 'node_modules/@types')]})
    return gulp.src(`${packageRoot}/src/**/*.ts`)
      .pipe(project())
      .pipe(gulp.dest(path.join(packageRoot, 'dist')))
  })
})

gulp.task('clean', function() {
    return del(['packages/*/dist'])
})

gulp.task('build', packages.map((package) => `build:${package}`))
