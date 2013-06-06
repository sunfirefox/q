"use strict";

var Q = require("../q");

suite("A single simple async operation", function () {
    bench("with an immediately-fulfilled promise", function (done) {
        Q().then(done);
    });

    bench("with direct setImmediate usage", function (done) {
        setImmediate(done);
    });

    bench("with direct setTimeout(…, 0)", function (done) {
        setTimeout(done, 0);
    });
});

suite("1000 operations in parallel", function () {
    function makeCounter(desiredCount, ultimateCallback) {
        var soFar = 0;
        return function () {
            if (++soFar === desiredCount) {
                ultimateCallback();
            }
        };
    }
    var numberOfOps = 1000;

    bench("with immediately-fulfilled promises", function (done) {
        var counter = makeCounter(numberOfOps, done);

        for (var i = 0; i < numberOfOps; ++i) {
            Q().then(counter);
        }
    });

    bench("with direct setImmediate usage", function (done) {
        var counter = makeCounter(numberOfOps, done);

        for (var i = 0; i < numberOfOps; ++i) {
            setImmediate(counter);
        }
    });
});
