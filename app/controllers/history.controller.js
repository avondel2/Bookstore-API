const db = require("../models");
const mongoose = require("mongoose");

const History = db.history;
const User = db.user;
const Books = db.books;


exports.notreturnhistory = (req, res) => {

    User.aggregate([
        { $lookup:
            {
                from: 'histories',
                let: { "user_ID": "$_id" },
                pipeline: [
                    { $match: { returned:false,"$expr": { "$eq": ["$userID", "$$user_ID"] }}},
                    { $project: { userID: 0, _id: 0 ,ReturnDate:0,__v:0} },
                    { $lookup: 
                        {
                        from: "books",
                        let: { "book_ID": "$bookID" },
                        pipeline: [
                            { $match: { "$expr": { "$eq": ["$_id", "$$book_ID"] }}},
                            { $project: { bookname:1,barcode:1,_id:0} },
                        ],
                        as: "BookDetails"
                        }
                    },
                    {
                        $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$BookDetails", 0 ] }, "$$ROOT" ] } }
                    }
                ],
                as: 'HistoryDetails' ,
            },
        },
        { $match : { "HistoryDetails.returned": false}},
        { $project: { "HistoryDetails.bookID": 0,_id:0,roles:0,password:0,__v:0,"HistoryDetails.BookDetails":0} }
        
    ]).exec((err, history) => {
        if(err){
            res.send({message:err})
        }

        res.status(200).json({
            NotReturnedHistory:history
        });
        
    });

};


exports.allhistory = (req, res) => {


    User.aggregate([
                { $lookup:
                    {
                        from: 'histories',
                        let: { "user_ID": "$_id" },
                        pipeline: [
                            { $match: {"$expr": { "$eq": ["$userID", "$$user_ID"] }}},
                            { $project: { userID: 0, _id: 0 ,ReturnDate:0,__v:0} },
                            { $lookup: {
                                from: "books",
                                let: { "book_ID": "$bookID" },
                                pipeline: [
                                { $match: { "$expr": { "$eq": ["$_id", "$$book_ID"] }}},
                                { $project: { bookname:1,barcode:1,_id:0} },
                                ],
                                as: "BookDetails"
                                }
                            },
                            {
                                 $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$BookDetails", 0 ] }, "$$ROOT" ] } }
                            }
                        ],
                        as: 'HistoryDetails' ,
                    },
            },
            { $project: { "HistoryDetails.bookID": 0,_id:0,roles:0,password:0,__v:0,"HistoryDetails.BookDetails":0} }
        ]).exec((err, books) => {
            if(err){
                res.send({message:err})
            }

            res.status(200).json({
                UserHistory:books
            });
            
        });
    
};