var mongoose = require('mongoose');
var connection = require('./connection');

class Followers {
    constructor() {
        const followSchema = mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            post_id: String,
            student_id: String,
            dateFollow: Date
        });
        this.followmodule = mongoose.model('Follow', followSchema, 'Follow');
    }

    getAllFollowers() {
        return new Promise((resolve, reject) => {
            this.followmodule.find((err, data) => {
                if (err) {
                    reject('Error Occured In Retrieve Data ' + err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    addNewFollowers(obj) {
        return new Promise((resolve, reject) => {

            const follow = {
                _id: new mongoose.Types.ObjectId(),
                post_id: obj.post_id,
                student_id: obj.student_id,
                dateFollow: obj.dateFollow
            }

            this.followmodule.create(follow, (err, data) => {
                if (err) {
                    reject('Error Insert Data ..... ');
                } else {
                    resolve('Successfully Inserted Data ..... ');
                }
            });
        });
    }

    getOneFollowers(id) {
        return new Promise((resolve, reject) => {
            this.followmodule.findById(id, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    deleteOneFollowers(id) {
        return new Promise((resolve, reject) => {

            this.followmodule.deleteOne({
                _id: id
            }, (err, data) => {
                if (err) {
                    reject('Error Delete Student ..... ' + err);
                } else {
                    resolve('Student Delete Successfully ..... ');
                }
            })
        })
    }

    updateOneFollowers(obj, id) {
        return new Promise((resolve, reject) => {

            this.followmodule.updateOne({
                _id: id
            }, {
                $set: {
                    "post_id": obj.post_id,
                    "student_id": obj.student_id,
                    "dateFollow": obj.dateFollow

                }
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
}

module.exports = Followers;