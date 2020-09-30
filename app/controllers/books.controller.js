const db = require("../models");
const moment = require('moment');

const Books = db.books;
const History = db.history;


exports.insertbooks = (req, res) => {
    if(req.body.bookname&&req.body.barcode&&req.body.quantity){
        const books = new Books({
            bookname: req.body.bookname,
            barcode: req.body.barcode,
            quantity: req.body.quantity
        });
        
        books.save((err, books) => {
            if(err){
                if (err.code == 11000) {
                    return res.status(500).send({ message: "Book Barcode Duplicate" });
                    
                }
                return res.status(500).send({ message: err});
            }
            else{
                res.json({ message: "This book was inserted successfully!" });
            }
        });
    }else{
        res.status(400).send({ message:"Bad request"})
    }
};


exports.getbooks = (req, res) => {
    Books.find().exec((err, books) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.status(200).json({
            Books:books
        });
    });
};

exports.updatebooks = (req, res) => {
    if((req.body.quantity||req.body.bookname)&&(req.body.ID||req.body.barcode)){

        let update = {}

        if(req.body.bookname){
            update.bookname = req.body.bookname
        }
        if(req.body.quantity||req.body.quantity>=0){
            update.quantity = req.body.quantity
        }
    
        let filter = {}

        if(req.body.ID){
            filter._id = req.body.ID
        }else if(req.body.barcode){
            filter.barcode = req.body.barcode
        }
    
        Books.findOneAndUpdate(filter,update).exec((err,books)=>{
            if(err){
                return res.status(500).send({ message: err});
            }
            
            if(!books){
                return res.json({ message: "Book not Found!" });
            }
            else{
                res.json({ message: "This book was updated successfully!" });
            }
        })
    }else{
        res.status(400).send({ message:"Bad request"})
    }
};

exports.rentbooks = (req, res) => {

    if(req.body.barcode){
        Books.findOne({barcode: req.body.barcode})
            .exec((err, books) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!books) {
                return res.status(404).send({ message: "Books Not found." });
            }
            
            if(books.quantity<1){
                return res.status(404).send({message: "This Book out of Stock"})
            }else{
                Books.findByIdAndUpdate(books._id,{$inc:{quantity:-1}}).exec((err,data) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    const history = new History({
                        userID: req.userID,
                        bookID: books._id
                    });
                    
                    history.save((err, history) => {
                        if(err){
                            return res.status(500).send({ message: err});
                        }
                        else{
                            res.json({ message: "Rent books successfully!" });
                        }
                    });
                });
            }
        });
    }else{
        res.status(400).send({ message:"Bad request"})
    }
};

exports.returnbooks = (req, res) => { // Incompleted
    if(req.body.barcode){
        Books.findOne({barcode: req.body.barcode})
            .exec((err, books) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                if (!books) {
                    return res.status(404).send({ message: "Books Not found." });
                }

                History.findOneAndUpdate({bookID:books._id,userID:req.userID,returned:false},{returned:true,ReturnDate:moment.utc()}).exec((err,bookrented) =>{
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    if(!bookrented){
                        return res.status(404).send({ message: "You dont rent this book" });
                    }

                    Books.findByIdAndUpdate(books._id,{$inc:{quantity:1}}).exec((err,updatebook)=>{
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        rentday = Math.floor(Math.abs((bookrented.RentDate-Date.now())/(86400*1000)))
                        res.status(200).json({
                            Bookname:books.bookname,
                            Barcode:books.barcode,
                            RentDate:bookrented.RentDate,
                            ReturnDate:moment.utc(),
                            RentDay:rentday,
                            ReturnLateCost:rentday<=3?0:(rentday-3)*20,
                        });
                    });


                })
            });
    }else{
        res.status(400).send({ message:"Bad request"})
    }
}