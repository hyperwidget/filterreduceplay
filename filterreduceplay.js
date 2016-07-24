const TEMPLATEOBJECT = { id: 0, contents: [1, 2, 3, 4], included: false };
const OBJECTAMOUNT = 10000;
const TESTAMOUNT = 1000;

let filterResults = [];
let mapResults = [];
let reduceResults = [];
let forEachResults = [];
let forResults = [];
let objectsArray = [];

function createObjects() {
    document.getElementById('status').innerText = 'Creating ' + OBJECTAMOUNT + ' objects to play with . . . This could take a couple of seconds';
    setTimeout(function () {
        for (let index = 0; index <= OBJECTAMOUNT; index++) {
            objectsArray = [...objectsArray,
                Object.assign({}, TEMPLATEOBJECT, { id: index, included: Math.round(Math.random()) === 1 })
            ];
        }
        document.getElementById('status').innerText = "" + OBJECTAMOUNT + " objects created; let's play";

        document.getElementById('actions').className = 'show';
        document.getElementById('bothCheck').className = 'show';
    }, 1000);
}

function getTimeDifference(startTime) {
    return performance.now() - startTime;
}

function filterObjects() {
    document.getElementById('actionStatus').className = 'show';
    document.getElementById('actionStatus').innerText = "Started filtering (" + OBJECTAMOUNT + " objects " + TESTAMOUNT + " times) . . . How long will it take!?!?";
    let times = [];
    let sum = 0;
    setTimeout(function () {
        for (let index = 0; index <= TESTAMOUNT; index++) {
            let start = performance.now();
            let filteredObjects = objectsArray.filter(function (item) {
                return item.included;
            });
            times.push(getTimeDifference(start));
        }
        for (let index = 0; index < times.length; index++) {
            sum += times[index];
        }

        let result = "Filtering took an average of: " + sum / TESTAMOUNT + "ms";

        console.log(result);
        document.getElementById('actionStatus').innerText = result;
    }, 1000);
}

function reduceObjects() {
    document.getElementById('actionStatus').className = 'show';
    document.getElementById('actionStatus').innerText = "Started reducing (" + OBJECTAMOUNT + " objects " + TESTAMOUNT + " times) . . . How long will it take!?!?";
    let times = [];
    let sum = 0;
    setTimeout(function () {
        for (let index = 0; index <= TESTAMOUNT; index++) {
            let start = performance.now();
            let reducedObjects = objectsArray.reduce(function (temp, item) {
                item.included ? temp.push(item) : '';
                return temp;
            }, []);
            times.push(getTimeDifference(start));
        }
        for (let index = 0; index < times.length; index++) {
            sum += times[index];
        }

        let result = "Reducing took an average of: " + sum / TESTAMOUNT + "ms";

        console.log(result);
        document.getElementById('actionStatus').innerText = result;
    }, 1000);
}

function filterReduceObjects(callback) {
    document.getElementById('actionStatus').className = 'show';
    document.getElementById('actionStatus').innerText = "Started filter reducing (" + OBJECTAMOUNT + " objects " + TESTAMOUNT +
        " times) . . . How long will it take!?!?";
    let times = [];
    let sum = 0;
    let validityCheck = [];

    setTimeout(function () {
        for (let index = 0; index <= TESTAMOUNT; index++) {
            let start = performance.now();
            var filteredObjects = objectsArray.filter(function (item) {
                return item.included;
            }).reduce(function (retArr, item) {
                item.randoVal = Math.random();
                retArr.push(item);
                return retArr;
            }, []);

            times.push(getTimeDifference(start));
            if (index === 0) {
                validityCheck = filteredObjects.reduce(function (temp, item) {
                    temp.push(item);
                    return temp;
                }, []);
            } else {
                let checkPoint = Math.floor(Math.random() * validityCheck.length) + 1
                if (validityCheck[checkPoint] !== filteredObjects[checkPoint]) {
                    console.error("VALIDITY CHECK FAILED!");
                }
            }
        }
        for (let index = 0; index < times.length; index++) {
            sum += times[index];
        }

        let result = "Filter reducing took an average of: " + sum / TESTAMOUNT + "ms";

        console.log(result);
        document.getElementById('actionStatus').innerText = result;
        filterResults = [validityCheck, sum];
        if (callback) {
            callback();
        }
    }, 1000);
}

function filterMapObjects(callback) {
    document.getElementById('actionStatus').className = 'show';
    document.getElementById('actionStatus').innerText = "Started filter mapping (" + OBJECTAMOUNT + " objects " + TESTAMOUNT +
        " times) . . . How long will it take!?!?";
    let times = [];
    let sum = 0;
    let validityCheck = [];

    setTimeout(function () {
        for (let index = 0; index <= TESTAMOUNT; index++) {
            let start = performance.now();
            var filterMappedObjects = objectsArray.filter(function (item) {
                return item.included;
            }).map(function (item) {
                return Object.assign(item, { randoVal: Math.random() });
            });

            times.push(getTimeDifference(start));
            if (index === 0) {
                validityCheck = filterMappedObjects.reduce(function (temp, item) {
                    temp.push(item);
                    return temp;
                }, []);
            } else {
                let checkPoint = Math.floor(Math.random() * validityCheck.length) + 1
                if (validityCheck[checkPoint] !== filterMappedObjects[checkPoint]) {
                    console.error("VALIDITY CHECK FAILED!");
                }
            }
        }
        for (let index = 0; index < times.length; index++) {
            sum += times[index];
        }

        let result = "Filter mapping took an average of: " + sum / TESTAMOUNT + "ms";

        console.log(result);
        document.getElementById('actionStatus').innerText = result;
        mapResults = [validityCheck, sum];
        if (callback) {
            callback();
        }
    }, 1000);
}

function reduceFilterObjects(callback) {
    document.getElementById('actionStatus').className = 'show';
    document.getElementById('actionStatus').innerText = "Started reduce filtering (" + OBJECTAMOUNT + " objects " + TESTAMOUNT +
        " times) . . . How long will it take!?!?";
    let times = [];
    let sum = 0;
    let validityCheck = [];
    setTimeout(function () {
        for (let index = 0; index <= TESTAMOUNT; index++) {
            let start = performance.now();
            let reducedObjects = objectsArray.reduce(function (temp, item) {
                if (item.included) {
                    item.randoVal = Math.random();
                    temp.push(item);
                }
                return temp;
            }, []);
            times.push(getTimeDifference(start));

            if (index === 0) {
                validityCheck = reducedObjects.reduce(function (temp, item) {
                    temp.push(item);
                    return temp;
                }, []);
            } else {
                let checkPoint = Math.floor(Math.random() * validityCheck.length) + 1
                if (validityCheck[checkPoint] !== reducedObjects[checkPoint]) {
                    console.error("VALIDITY CHECK FAILED!");
                }
            }
        }
        for (let index = 0; index < times.length; index++) {
            sum += times[index];
        }

        let result = "Reduce Filtering took an average of: " + sum / TESTAMOUNT + "ms";

        console.log(result);
        document.getElementById('actionStatus').innerText = result;

        reduceResults = [validityCheck, sum];
        if (callback) {
            callback();
        }
    }, 1000);
}

function forEachObjects(callback) {
    document.getElementById('actionStatus').className = 'show';
    document.getElementById('actionStatus').innerText = "Started foreach filtering (" + OBJECTAMOUNT + " objects " + TESTAMOUNT +
        " times) . . . How long will it take!?!?";
    let times = [];
    let sum = 0;
    let validityCheck = [];
    setTimeout(function () {
        for (let index = 0; index <= TESTAMOUNT; index++) {
            let forEachObjects = [];

            let start = performance.now();
            objectsArray.forEach(function (item) {
                if (item.included) {
                    item.randoVal = Math.random();
                    forEachObjects.push(item);
                }
            });

            times.push(getTimeDifference(start));

            if (index === 0) {
                validityCheck = forEachObjects.reduce(function (temp, item) {
                    temp.push(item);
                    return temp;
                }, []);
            } else {
                let checkPoint = Math.floor(Math.random() * validityCheck.length) + 1
                if (validityCheck[checkPoint] !== forEachObjects[checkPoint]) {
                    console.error("VALIDITY CHECK FAILED!");
                }
            }
        }
        for (let index = 0; index < times.length; index++) {
            sum += times[index];
        }

        let result = "Foreach Filtering took an average of: " + sum / TESTAMOUNT + "ms";

        console.log(result);
        document.getElementById('actionStatus').innerText = result;

        forEachResults = [validityCheck, sum];
        if (callback) {
            callback();
        }
    }, 1000);
}

function forObjects(callback) {
    document.getElementById('actionStatus').className = 'show';
    document.getElementById('actionStatus').innerText = "Started foreach filtering (" + OBJECTAMOUNT + " objects " + TESTAMOUNT + " times) . . . How long will it take!?!?";
    let times = [];
    let sum = 0;
    let validityCheck = [];
    setTimeout(function () {
        for (let index = 0; index <= TESTAMOUNT; index++) {
            let forObjects = [];

            let start = performance.now();

            for (var i = 0; i < objectsArray.length; i++) {
                if (objectsArray[i].included) {
                    objectsArray[i].randoVal = Math.random();
                    forObjects.push(objectsArray[i]);
                }
            }

            times.push(getTimeDifference(start));

            if (index === 0) {
                validityCheck = forObjects.reduce(function (temp, item) {
                    temp.push(item);
                    return temp;
                }, []);
            } else {
                let checkPoint = Math.floor(Math.random() * validityCheck.length) + 1
                if (validityCheck[checkPoint] !== forObjects[checkPoint]) {
                    console.error("VALIDITY CHECK FAILED!");
                }
            }
        }
        for (let index = 0; index < times.length; index++) {
            sum += times[index];
        }

        let result = "For Filtering took an average of: " + sum / TESTAMOUNT + "ms";

        console.log(result);
        document.getElementById('actionStatus').innerText = result;

        forResults = [validityCheck, sum];
        if (callback) {
            callback();
        }
    }, 1000);
}

function compareAll() {
    filterReduceObjects(function () {
        filterMapObjects(function () {
            reduceFilterObjects(function () {
                forEachObjects(function () {
                    forObjects(function () {
                        if (((filterResults[0][5] === reduceResults[0][5]) &&
                            (filterResults[0][5] === forEachResults[0][5]) &&
                            (filterResults[0][5] === forResults[0][5]) &&
                            (filterResults[0][5] === mapResults[0][5]))
                            && ((filterResults[0][filterResults.length] === reduceResults[0][reduceResults.length]) &&
                                (filterResults[0][filterResults.length] === mapResults[0][mapResults.length]) &&
                                (filterResults[0][filterResults.length] === forEachResults[0][forEachResults.length]) &&
                                (filterResults[0][filterResults.length] === forResults[0][forResults.length]))) {

                            let filterAvg = { val: filterResults[1] / TESTAMOUNT, name: 'filter' };
                            let mapAvg = { val: mapResults[1] / TESTAMOUNT, name: 'map' };
                            let reduceAvg = { val: reduceResults[1] / TESTAMOUNT, name: 'reduce' };
                            let forEachAvg = { val: forEachResults[1] / TESTAMOUNT, name: 'forEach' };
                            let forAvg = { val: forResults[1] / TESTAMOUNT, name: 'for' };
                            let filterMessage = "Filter reducing took an average of: " + filterAvg.val + "ms ";
                            let mapMessage = "Filter mapping took an average of: " + mapAvg.val + "ms ";
                            let reduceMessage = "Reduce Filtering took an average of: " + reduceAvg.val + "ms ";
                            let forEachMessage = "ForEach Filtering took an average of: " + forEachAvg.val + "ms ";
                            let forMessage = "For Filtering took an average of: " + forAvg.val + "ms ";
                            document.getElementById('allStatus').innerHTML = filterMessage + '<br/>' +
                                mapMessage + '<br/>' +
                                reduceMessage + '<br/>' +
                                forEachMessage + '<br/>' +
                                forMessage + '<br/>' + '<br/>' + '<br/>' + '<br/>';

                            let avgs = [filterAvg, mapAvg, reduceAvg, forEachAvg, forAvg].sort(sortAvgs);

                            document.getElementById('allStatus').innerHTML += 'That makes ' + avgs[0].name + ' the fastest!<br/>' +
                                'by a whopping %' + (avgs[avgs.length - 1].val / avgs[0].val * 100) + ' over ' + avgs[avgs.length - 1].name;
                            document.getElementById('allStatus').className = 'show';

                            for (var index = 0; index < avgs.length; index++) {
                                document.getElementById('chart' + (index + 1)).style.height = 400 / (avgs[avgs.length - 1].val / avgs[avgs.length - (index + 1)].val) + 'px';
                                document.getElementById('chart' + (index + 1)).getElementsByTagName('p')[0].innerText = avgs[avgs.length - (index + 1)].name + ' ' + avgs[avgs.length - (index + 1)].val;
                            }
                            document.getElementById('semi-charts').className = 'show';
                        } else {
                            console.error(filterResults[0][5]);
                            console.error(mapResults[0][5]);
                            console.error(reduceResults[0][5]);
                            console.error(forEachResults[0][5]);
                            console.error(forResults[0][5]);
                        }
                    })
                })
            })
        })
    });
}

function sortAvgs(a, b) {
    return a.val - b.val;
}