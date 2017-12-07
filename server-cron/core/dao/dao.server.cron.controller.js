const config = require('../../config/enviroment')
const client = require('mongodb').MongoClient;
const mongoHelperFactory = require('../../common/utils/db/mongo-helper-factory');

exports.insertCrawlData = function(device, region, todaySuffix, docs){
    const dbUri = `${config.mongo.baseUri}_${device}_${region}`;
    const collectionName = `${config.mongo.collectionName.crawlDatas}-${todaySuffix}`;
    
    return new Promise((resolve, reject) => {
        client.connect(dbUri).then(function(db){
            db.collection(collectionName).insertOne(docs).then((r) =>{
                db.close();
                resolve(docs);
            }).catch((err) => {
                reject(err.errmsg);
            })
        })       
    })
}

exports.doAggregate = function(device, region, todaySuffix, aggregateDocs) {
    if(process.env.NODE_ENV == 'development') todaySuffix = '000000';

    const dbUri = `${config.mongo.baseUri}_${device}_${region}`;
    const targetCollectionName = `${config.mongo.collectionName.crawlDatas}-${todaySuffix}`;

    return new Promise((resolve, reject) => {
        client.connect(dbUri).then(function(db){
            db.collection(targetCollectionName).aggregate(aggregateDocs, function(err, result){
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
                db.close();
            })
        })
    })
}

exports.updateTierData = function(device, region, todaySuffix, doc){
    const dbUri = `${config.mongo.baseUri}_${device}_${region}`;
    const collectionName = config.mongo.collectionName.tierDatas;

    client.connect(dbUri).then(function(db){
        db.collection('tier-datas').update({_id : todaySuffix}, doc, {upsert : true}, function(err, result) {
            if(err) {
                console.log(err);
            } 
            db.close();
        })
    });
}


/**
 *      Read Query
 */

/* Find All Player in Database(pc_kr, pc_us).... */

exports.findAllPlayers = function(device, region) {
    return new Promise((resolve, reject) => {
        const dbUri = `${config.mongo.baseUri}_${device}_${region}`;
        const collectionName = `players`;

        client.connect(dbUri).then(function(db){
            db.collection(collectionName).find().sort({_id : 1}).project({ _id: 1, btg: 1 }).toArray().then((docs) => {
                db.close();
                resolve(docs);
            })
        })
    });
}

// exports.findAllPlayers = function(device, region) {
//     return new Promise((resolve, reject) => {
//         setTimeout(function() {
//             // resolve([{btg : '냅둬라날-3934'}, {btg : 'Ac8-31846'}, {btg : '냅둬라날-3934'}, {btg : 'Ac8-31846'}, {btg : '냅둬라날-3934'}, {btg : 'Ac8-31846'}])
//             resolve([{btg : '냅둬라날-3934', id : 1}, {btg : 'Ac8-31846', id : 2}, {btg : '냅둬라날-3934', id : 3}])
//         })
//     }, 3000);
// }


//@deprecated 2017.12.05
// exports.findAllPlayers = function(dbName, callback){
    
//     var collectionName = "temp_playerlist";

//     var helper = new mongoDbHelper.MongoDbHelper(dbName); //TODO: separate outside...

//     var indexDocumentId = "indexDocument";
//     var query = {};
//     var query = { _id : {$ne : indexDocumentId} }; // not include which _id is not `indexDocumentId`

//     if(arguments.length == 1) return helper.find(collectionName, query);
//     else if (arguments.length == 2) helper.find(collectionName, query, callback);
//     else throw new Error("Arguments Exception in ggez-crud.js");
// }

exports.findAllPlayerDatas = function(dbName, collectionName, calback){
    
    var helper = new mongoDbHelper.MongoDbHelper(dbName); //TODO: separate outside...

    var query = {};

    if(arguments.length == 2) return helper.find(collectionName, query);
    else if (arguments.length == 3) helper.find(collectionName, query, callback);
    else throw new Error("Arguments Exception in ggez-crud.js");
}

exports.findPlayer = function(index){
    // findPlayer overloading...
}

