'use strict';

var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

/**
  updateRecipeById: Updates a selected recipe
  @param:
      Sample Body:{
      {
          "rating":	3.5,
	       "recipeName":	"Cheese Pasta 2",
         "ingredients":{
            "onion": 100,
            "pasta": 500,
            "red pepper": 100,
            "yellow pepper": 100,
            "cheese": 500,
            "green pepper": 150
          },
          "steps":{
            "step 1" : "Finely chop green, yellow and red pepper",
            "step 2" : "Boil pasta in an utensil for an hour",
            "step 3" : "Heat oil in a pan and melt the cheese",
            "step 4" : "After cheese melts, saute all veggies and pasta",
            "step 5" : "Serve hot with bread"
          },
          "recipeCuisine" : "Italian"
        }
      }
  @returns: void
  @author: Mukul on 04/16/2017
*/
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
    UpdateExpression: "set recipeName = :recipeName, "+
                      "recipeCuisine= :recipeCuisine, "+
                      "rating = :rating, steps= :steps,"+
                      " ingredients= :ingredients",
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
      console.log('Could not update recipe with id: '+recipeId+' Error JSON: '+
                                            JSON.stringify(err, null, 2));
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
