// Rapid Prototype: of data-driven-templates
// a bit of a mess due to trying out a bunch of techniques...
// based on http://onehungrymind.com/angularjs-dynamic-templates/
// also see (for a good overview of angular)
// http://stephanebegaudeau.tumblr.com/post/48776908163/everything-you-need-to-understand-to-start-with
// look into loading templates via https://github.com/requirejs/text or angular.$templateCache
// or https://npmjs.org/package/grunt-angular-templates per (simpulton September 7, 2013 at 12:52 pm)
//

var app = angular.module('ddtApp', ['ngSanitize']);


app.directive('drivenTemplate', function ($compile) {
    var templates = {
        "section": '<div class="demo-section"><h2>{{content.title}}</h2>\
                      <p>{{content.narrative}}</p>\
                    </div>',
        "table":   '<div class="demo-table"><table><tbody>\
                      <tr ng-repeat="row in content.data" >\
                        <td ng-repeat="cell in row">\
                          <span ng-bind-html="cell"></span>\
                        </td>\
                      </tr></tbody>\
                    </table></div>',
        "footer":  '<div class="demo-footer">\
                      <p>{{content.narrative}}</p>\
                    </div>'
    };

    var getTemplate = function(viewType) {
        return templates[viewType];
    };

    var linker = function(scope, element, attrs) {
        element.html(getTemplate(scope.content.view_template));
        $compile(element.contents())(scope);
    };

    return {
        restrict: "A",
        replace: true,
        link: linker,
        scope: {
            content:'=content'
        }
    };
});


function demoCtrl($scope, $http) {
    "use strict";
    $scope.content = {
        "items": [
            {
                "view_template": "section",
                "title": "The First Program",
                "narrative": "Lorem ipsum Lady Ada dolor sit amet, consectetur adipiscing elit.\
                     Nunc pulvinar pretium felis. Vivamus nibh felis, condimentum sit amet ."
            },
            {
                "view_template": "table",
                "title": "A First Table",
                "data": [
                    ["For x<sup>an</sup>", "the operations would be", "34 (x)"],
                    ["... a.n.x ",         "... ... ...", "(x, x), or 2 (x)"],
                    ["... (a/n).x ",       "... ... ...", "(÷, x)"],
                    ["... a + n + x",      "... ... ...", "(+, +), or 2 (+)"]
                ]
            },
            {
                "view_template": "section",
                "title": "A Second Section",
                "narrative": "Lorem ipsum blah blah blah dolor sit amet, consectetur adipiscing."
            },
            {
                "view_template": "footer",
                "narrative": "Lorem ipsum footer ipsum dolor sit footer amet, consectetur\
                    adipiscing elit. Nunc pulvinar pretium felis. Vivamus nibh"
            }
        ]
    };

    $scope.stringify_content = function () {
        return JSON.stringify($scope.content, null, ' ');
    };
    $scope.add_content = function () {
        $scope.content.items.unshift({
          "view_template": "section", "title": "A New First Section",
          "narrative": "Lorem ipsum nan nan-nan nan-nan nahh dolor sit amet, consectetur adicing elit."
        });
    };
}
