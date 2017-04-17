'use strict';


var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();
const hat = require('hat'); // A random number for new recipe

/**
  This function creates a new recipeItem in the DynamoDB table.
  @param: Sample body
  {
    "rating":	4,
	  "recipeName":	"Burrito",
      "ingredients":{
          "onion": 100,
          "chicken": 100,
          "jalapeno": 20,
          "white rice": 30,
          "taco roll": 1
      },
      "steps":{
          "step 1" : "Finely chop green, yellow and red pepper",
          "step 2" : "Boil pasta in an utensil for an hour",
          "step 3" : "Heat oil in a pan and melt the cheese",
          "step 4" : "After cheese melts, saute all veggies and add pasta",
          "step 5" : "Serve with bread"
      },
      "recipeCuisine" : "Mexican"
  }
  @author: Mukul on 04/16/2017
*/
module.exports.createRecipe = (event, context, callback) => {

  var recipeId = hat();
  var newRecipeItem = JSON.parse(event.body);
  newRecipeItem.recipeId = recipeId;
  newRecipeItem.recipeItemId = "RP"+recipeId;
  var params = {
    TableName:process.env.DYNAMODB_TABLES,
    Item: newRecipeItem
  };
  docClient.put(params, function(err, data){
    if(err){
      console.log('Unable to add items. Error JSON: '+
                        JSON.stringify(err, null, 2));
    }else{
      console.log('Added new recipe ', JSON.stringify(data, null, 2));

      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'New Recipe Added successfully with recipeId: '+recipeId,
        }),
      };
      callback(null, response);
    }
  });
};
