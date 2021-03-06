'use strict;'

var _ = require("underscore");
var async = require("async");

var record = require('blue-button-record');

record.connectDatabase('localhost', function (err) {
    if (err) throw err;
});

//Splice duplicate entries from input array.
//Add source attribution to matched entries.
function removeDuplicates(username, match, newRecord, baseRecord, recordID) {

    var newRecord = _.clone(newRecord);

    var duplicateArray = [];

    var newMatch = {};

    _.map(match, function (value, matchKey) {
        if (_.isArray(value)) {
            duplicateArray = _.where(value, {
                dest: 'dest',
                match: 'duplicate'
            });

            duplicateNewIndexArray = _.uniq(_.pluck(duplicateArray, 'src_id'));
            duplicateBaseIndexArray = _.uniq(_.pluck(duplicateArray, 'dest_id'));

            if (matchKey === 'social_history') {
                //console.log(match);
                //console.log(newRecord.social_history[0]);
                //console.log(baseRecord.social_history[4]);

            }

            var attributionRecord = _.filter(baseRecord[matchKey], function (object, objectIndex) {
                if (_.contains(duplicateBaseIndexArray, objectIndex.toString())) {
                    return true;
                } else {
                    return false;
                }
            });

            //Update Source attribution.
            async.each(attributionRecord,
                function (attribution, callback) {
                    record.duplicateEntry(matchKey, username, attribution._id, recordID, function (err) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null);
                        }
                    })
                },
                function (err) {
                    if (err) {
                        console.log(err);
                        //callback(err);
                    } else {
                        //console.log("updating source attribution - success");
                        //callback();
                    }
                });

            //Remove Duplicates from Entry List.
            var returnRecord = _.filter(newRecord[matchKey], function (object, objectIndex) {
                if (_.contains(duplicateNewIndexArray, objectIndex.toString())) {
                    return false;
                } else {
                    return true;
                }
            });

            //Remove Duplicates from Match List.
            //use duplicate new index array to go through matches, and remove.
            var returnMatch = _.filter(match[matchKey], function (object, objectInex) {
                if (_.contains(duplicateNewIndexArray, object.src_id)) {
                    return false;
                } else {
                    return true;
                }
            });

            //console.log(returnMatch);

            //console.log(returnRecord);

            newRecord[matchKey] = returnRecord;

            if (returnMatch === undefined) {
                returnMatch = [];
            }

            if (returnRecord === undefined) {
                returnRecord = [];
            }

            newMatch[matchKey] = returnMatch;

        } else {
            if (value.match === 'duplicate' && matchKey === 'demographics') {

                var attributionRecord = baseRecord[matchKey];

                async.each(attributionRecord, function (attribution, callback) {
                    record
                        .duplicateEntry(matchKey, username, attribution._id, recordID, function (err) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null);
                            }
                        })
                }, function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        //callback();
                    }
                });

                delete newRecord[matchKey];
                //delete newMatch[matchKey];
            } else if (matchKey === 'demographics') {
                newMatch[matchKey] = value;
            }

        }
    });

    _.map(newRecord, function (value, field) {
        if (_.isArray(value)) {
            if (value.length === 0) {
                delete newRecord[field];
            }
        }
    });

    //console.log(match);

    //console.log(JSON.stringify(newMatch, null, 10));

    //This area can equal undefined on new_record entries for some reason.

    var returnObject = {
        new_record: newRecord,
        new_match: newMatch
    }

    return returnObject;
}

exports.removeDuplicates = removeDuplicates;
