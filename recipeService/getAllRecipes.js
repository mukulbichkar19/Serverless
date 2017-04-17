'use strict';

var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

/**
  getAllRecipes: Returns all recipes present in the table
  @returns JSON containing all recipes
  @author Mukul on 04/16/2017
*/
module.exports.getAllRecipes = (event, context, callback) => {

  var params = {
    TableName: process.env.DYNAMODB_TABLES,
    ProjectionExpression: "recipeName, ingredients, recipeCuisine, steps,"+
                            "rating, recipeId, recipeItemId"
};

  docClient.scan(params, function(err, data){
    if(err){
      console.log("Unable to read item from table. Error JSON: ",
                                                JSON.stringify(err, null, 2));
    }else{
      console.log('Get All Recipes Succeeded: '+JSON.stringify(data, null, 2));
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          data: data
        }),
      }
      callback(null, response);
    }
  });

};
