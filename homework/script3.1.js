var db = db.getSiblingDB('school');

var cursor = db.students.find();

while (cursor.hasNext()) {
    var current = cursor.next();
    var scores = current.scores;
    var scoresUpdate = [];

    var highHomeworkEntry = {
        "score" : 0,
        "type" : 'homework'
    };

    var index = 0;

    for (scoreIndex in scores) {
        var scoreEntry = scores[scoreIndex];

        if (scoreEntry.type == 'homework') {
            if (scoreEntry.score > highHomeworkEntry.score) {
                highHomeworkEntry = scoreEntry;
            }
        } else {
            scoresUpdate[index] = scoreEntry;
            index++;
        }
    }

    scoresUpdate[index] = highHomeworkEntry;

    db.students.update({_id : current._id}, {$set : {"scores" : scoresUpdate}});
}