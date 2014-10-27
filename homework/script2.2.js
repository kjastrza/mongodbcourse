var db = db.getSiblingDB('students');

var cursor = db.grades.find({"type": "homework"}).sort({student_id: 1, score: -1});

var init = true;
var currentGrade;

while (cursor.hasNext()) {
    var loopGrade = cursor.next();

    if (init) {
        init = false;
    } else {
        if (loopGrade.student_id != currentGrade.student_id) {
            db.grades.remove({_id: currentGrade._id})
        }
    }
    currentGrade = loopGrade;
}

db.grades.remove({_id: currentGrade._id})
