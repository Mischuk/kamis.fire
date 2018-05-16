# [Kamis.fire](http://frontend.watch/kamis.fire)
* Based on [Gulp](http://gulpjs.com/)
* [Pug](https://pugjs.org) templates + cached changes/posthtml
* [Stylus](http://stylus-lang.com/) + sourcemaps/rupture/jeet/postcss
* [Server](https://www.npmjs.com/package/gulp-connect) + livereload
* Included modules/components
* Deploy build + app to zip

## Quick start
* Install [node.js](https://nodejs.org)
* Update npm to the latest version: `npm install npm@latest`
* Clone project
* Install gulp: `npm i -g gulp`
* Install dependencies: `npm i`
* Run dev server: `gulp dev`

The project will be available at [`http://localhost:8080/`](http://localhost:8080/)

## Tasks
* `gulp dev`
* `gulp deploy`
* `gulp build-zip`
* `gulp clean`


## Project
```
frontend/                           # Project
│
├── app                             # Build
│
├── dev                             # Source files
│   │
│   ├── components                  # Global patterns for modules
│   │   ├── buttons                 #
│   │   ├── modals                  #
│   │   ├── breadcrumbs             #
│   │   └── ...                     #
│   │
│   ├── modules                     # Modules included pug/styl/js files for templates
│   │   ├── header                  #
│   │   ├── footer                  #
│   │   └── ...                     #
│   │
│   ├── templates                   # Pages
│   │   ├── _content.pug            # Static data
│   │   ├── _layout_*.pug           # Extend layout for pages
│   │   ├── _mixins.pug             # Mixins for pug
│   │   ├── index.pug               # List of templates
│   │   ├── ui.pug                  # Project's UI
│   │   └── *.pug                   # Templates
│   │
│   └── static                      # Static files
│       ├── fonts                   # Fonts
│       │
│       ├── images                  # Images
│       │
│       ├── js                      # Vendors (js+css)
│       │   ├── autosize            # Textarea helper
│       │   ├── magnific-popup      # Modals/Gallery
│       │   ├── perfect-scrollbar   # Custom scrollbar
│       │   ├── select2             # Select
│       │   ├── slick               # Carousel
│       │   ├── jquery.min.js       # jQuery
│       │   ├── modernizr.js        # Modernizr
│       │   └── main.js             # Global functions + included modules js
│       │
│       └── styl                    # Global styles
│           ├── app.styl            # Import all stylus
│           ├── fonts.styl          # Font-face + font mixins
│           ├── helper.styl         # Helper classses
│           ├── layout.styl         # Styles for grid
│           ├── mixins.styl         # Mixins
│           ├── reset.styl          # Custom reset/normalize
│           ├── typography.styl     # Typography styles
│           └── variables.styl      # Project variables
│
├── tasks                           # PSD/TODO
├── tmp                             # Temporary files
├── .gitignore / .npmingrone        # Igrone files/folder
├── gulpfile.js                     # Gulp config
├── package.json                    # Project dependencies
└── README.md                       #
```

## Contacts
**Email**: mischuk.alexander@gmail.com

**Skype**: mischuk.alexander
