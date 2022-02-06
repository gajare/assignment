var mongoose = require("mongoose");

module.exports.createAgency = async (request, response) => {
    if (
        !request.body.name &&
        !request.body.address1 &&
        !request.body.state &&
        !request.body.city &&
        !request.body.phone &&
        !Array.isArray(request.body.clients) ||
        request.body.clients.length==0
    ) {
        console.log('one or more attributes missing, please try again');
        response.status(400).end();
    } else {
        var client_list = mongoose.model("client_list")
        client_list.insertMany(request.body.clients).then((client_result)=>{
            var ids=client_result.map(item=>{return item._id})
            var agency_list = mongoose.model("agency_list")
            agency_list.insertMany([{
                name:request.body.name,
                address1:request.body.address1,
                address2:request.body.address2,
                state:request.body.state,
                city:request.body.city,
                phone:request.body.phone,
                clients:ids
            }])
            .then((agency_result)=>{
                agency_result.clients=client_result
                console.log("agent inserted ids:"+agency_result)
                response.status(200).end()
            })
            .catch((error)=>{
                console.log("ERROR: "+error)        
                response.status(404).send({status:false})
            })
        })
        .catch((error)=>{
            console.log("ERROR: "+error)        
            response.status(404).send({status:false})
        })
    }
};

module.exports.updateClient = async (request, response) => {
    if (
        !request.body._id &&
        !request.body.name &&
        !request.body.email &&
        !request.body.phone &&
        !request.body.totalBill
    ) {
        console.log('one or more attributes missing, please try again');
        response.status(400).end();
    } else {
        var client_list = mongoose.model("client_list")
        client_list.findByIdAndUpdate(request.body._id,{$set:request.body})
        .then((result)=>{
            console.log('updateClient: '+result)
            response.status(200).send({status:true,data:result})
        })
        .catch((error)=>{
            console.log("ERROR: "+error)        
            response.status(404).send({status:false})
        })
    }
};

module.exports.getAgencyWithTopClient = async (request, response) => {
    if (!request.params.agency_id) {
        console.log('Agency ID required');
        response.status(400).end();
    } else {
        var agency_list = mongoose.model("agency_list")
        agency_list.aggregate([
            {
              '$lookup': {
                'from': 'client_lists', 
                'foreignField': '_id', 
                'localField': 'clients', 
                'as': 'clients'
              }
            }, {
              '$unwind': {
                'path': '$clients', 
                'preserveNullAndEmptyArrays': false
              }
            }, {
              '$sort': {
                'clients.totalBill': -1
              }
            }, {
              '$limit': 1
            }, {
              '$project': {
                '__v': 0, 
                'clients.__v': 0
              }
            }
          ])
        .then((result)=>{
            console.log('getAgencyWithTopClient: '+result)
            response.status(200).send({status:true,data:result})
        })
        .catch((error)=>{
            console.log("ERROR: "+error)        
            response.status(404).send({status:false})
        })
    }
};
