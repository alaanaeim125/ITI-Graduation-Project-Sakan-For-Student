var mongoose = require('mongoose');
var connection = require('./connection');

class Orders {
    constructor() {
        const orderSchema = mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            post_id: String,
            student_id: String,
            dateOrder: Date,
            Status: String
        });
        this.ordermodule = mongoose.model('Order', orderSchema, 'Order');
    }

    getAllOrders() {
        return new Promise((resolve, reject) => {
            this.ordermodule.find((err, data) => {
                if (err) {
                    reject('Error Occured In Retrieve Data ' + err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    addNewOrders(obj) {
        return new Promise((resolve, reject) => {

            const order = {
                _id: new mongoose.Types.ObjectId(),
                post_id: obj.post_id,
                student_id: obj.student_id,
                dateOrder: obj.dateOrder,
                Status: obj.status
            }

            this.ordermodule.create(order, (err, data) => {
                if (err) {
                    reject('Error Insert Data ..... ');
                } else {
                    resolve('Successfully Inserted Data ..... ');
                }
            });
        });
    }

    getOneOrders(id) {
        return new Promise((resolve, reject) => {
            this.ordermodule.findById(id, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    deleteOneOrders(id) {
        return new Promise((resolve, reject) => {

            this.ordermodule.deleteOne({
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

    updateOneOrders(obj, id) {
        return new Promise((resolve, reject) => {

            this.ordermodule.updateOne({
                _id: id
            }, {
                $set: {
                    "post_id": obj.post_id,
                    "student_id": obj.student_id,
                    "dateOrder": obj.dateOrder,
                    "Status": obj.status

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

module.exports = Orders;