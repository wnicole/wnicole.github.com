var fs = require("fs");

var Metalsmith = require("metalsmith");
var collections = require("metalsmith-collections");
var templates  = require("metalsmith-templates");
var permalinks = require("metalsmith-permalinks");
var beautify = require('metalsmith-beautify');

var findRemoveSync = require("find-remove");

var ROOT = process.argv[2] === "dev" ? "http://localhost:8080" : "http://www.nicoleworthington.com";

preBuildActions();

if (process.argv[2] !== "clean") {
    Metalsmith(__dirname)
        .metadata({
            siteroot: ROOT
        })
        .use(collections({
            projects: {
                pattern: "_projects/*",
                sortBy: 'order'
            }
        }))
        .use(permalinks({
            pattern: ":collection/:title",
            relative: false,
            onlyGenPaths: true
        }))
        .use(templates({
            engine: "handlebars",
            directory: "_site_src/_templates",
            recursiveRender: true,
            pretty: true
        }))
        .use(beautify({
            js: false,
            css: false,
            html: {
                indent_char: " ",
                indent_size: 4
            }
        }))
        .source("_site_src")
        .destination(".")
        .clean(false)
        .build(function(err, files) {
            postBuildActions();
        });
}

function preBuildActions() {
    // first clean the build.
    try {
        fs.unlinkSync("index.html");
    } catch(e){}
    findRemoveSync("projects");
    findRemoveSync("css");
    findRemoveSync("js");
    findRemoveSync("about");
    findRemoveSync("contact");
    findRemoveSync("_templates");
}

function postBuildActions() {
    // post build cleaning
    findRemoveSync("_templates");
}
