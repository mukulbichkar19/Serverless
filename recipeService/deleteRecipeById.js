'use strict';

var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports.deleteRecipeById = (event, context, callback) => {

  var recipeId = event.pathParameters.recipeId;

  var params = {
    TableName:process.env.DYNAMODB_TABLES,
    Key:{
        "recipeId": recipeId,
        "recipeItemId": "RP"+recipeId
    }
  };

  docClient.delete(params, function(err, data){
    if(err){
      console.log('Error Occured while deleting recipe with id: '+recipeId);
      console.log('Error:JSON ',JSON.stringify(err, null, 2));
      callback(err, null);
    }else{
      console.log('Recipe with id: '+ recipeId + 'deleted successfully.');
      var response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Recipe with Id '+recipeId+' deleted successfully'
        })
      }
      callback(null, response);
    }

  });

};
