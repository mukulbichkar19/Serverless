'use strict';

var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports.updateRecipeById = (event, context, callback) => {

  var recipeId = event.pathParameters.recipeId;
  var itemToBeUpdated = JSON.parse(event.body);
  console.log('ingredients '+itemToBeUpdated.ingredients);
  var params = {
    TableName: process.env.DYNAMODB_TABLES,
    Key:{
      "recipeId" : recipeId,
      "recipeItemId" : "RP"+recipeId
    },
    UpdateExpression: "set recipeName = :recipeName, recipeCuisine= :recipeCuisine, "+
              "rating = :rating, steps= :steps, ingredients= :ingredients",
    ExpressionAttributeValues:{
                  ":recipeName": itemToBeUpdated.recipeName,
                  ":recipeCuisine": itemToBeUpdated.recipeCuisine,
                  ":rating": itemToBeUpdated.rating,
                  ":steps": itemToBeUpdated.steps,
                  ":ingredients": itemToBeUpdated.ingredients
    },
    ReturnValues:"UPDATED_NEW"
  }

  docClient.update(params, function(err, data){
    if(err){
      console.log('Could not update recipe with id: '+recipeId+' Error JSON: '+JSON.stringify(err, null, 2));
      callback(err, null);
    }
    else{
      console.log('Recipe with id '+ recipeId + ' updated successfully');
      var response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Recipe : '+ recipeId + ' updated successfully'
        }),
      }
    };
    callback(null, response);

  });




};
