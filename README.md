# SASS Starter Kit
[![Build Status](https://travis-ci.org/HosseinKarami/fastshell.png?branch=master)](https://travis-ci.org/HosseinKarami/fastshell)

inspired by [FireShell](http://getfireshell.com)
Fiercely quick front-end boilerplate and workflows.

The opinionated FastShell framework. Built for the modern developer. For teams and the individual, encouraging a better workflow. JavaScript task running, build processes, autominification and file concatenation, wrapped with an enhanced HTML5 boilerplated framework.

* Source: [github.com/HosseinKarami/fastshell](http://github.com/HosseinKarami/fastshell)
* Documentation: [DOCS.md](https://github.com/HosseinKarami/fastshell/blob/master/DOCS.md)
* HomePage: [Fastshell](https://HosseinKarami.github.io/fastshell)

## Includes the following NPM packages
* gulp
* gulp-util
* gulp-sass
* browser-sync
* gulp-autoprefixer
* gulp-uglify
* gulp-jshint
* gulp-header
* gulp-rename
* gulp-cssnano
* gulp-sourcemaps
* minimist
* gulp-if
* gulp-prompt
* gulp-concat
* gulp-rsync

## Sass/SCSS setup

SASS Starter Kit comes with a .scss file setup and existing @import declarations to the very common web components. FastShell hopes to help those out who aren't sure about structuring a CSS project confidently as well as getting them setup with using a CSS PreProcessor. The basic idea:

* `mixins` holds all Sass/SCSS mixins, FastShell ships with a few helpers
* `module` holds modules, more Object-Orientated components and a generic app.scss for everything else, all file names should be modular/OO.
* `partials` holds the blueprints for the project, the header, footer, sidebar and so on.
* `vendor` holds any files that are third party, such as the font awesome icons CSS
* `style.scss` imports all the necessary files from the above folders, when adding new files be sure to add it inside this file.

## License

#### The MIT License (MIT)

Copyright (c) FastShell

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
