'use strict';

var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports.getRecipeById = (event, context, callback) => {

  var recipeId = event.pathParameters.recipeId;
  console.log('recipeId from path: '+recipeId);
  var params = {
    TableName: process.env.DYNAMODB_TABLES,
    KeyConditionExpression: 'recipeId = :recipeId',
    ExpressionAttributeValues: {
          ':recipeId': recipeId
    }

  }

  docClient.query(params, function(err, data){
    if(err){
      console.log('Error occured in fetching recipe with id: '+recipeId);
      callback(err, null);
    }else{
      console.log('Fetched recipe with id ' +recipeId + ' successfully');
      var response = {
        statusCode: 200,
        body: JSON.stringify({data: data})
      }
      callback(null, response);
    }
  });

};
