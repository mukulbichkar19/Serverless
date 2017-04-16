'use strict';


var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();


// variables
const table = "RECIPE_TABLES"; // The table you want to update
const hat = require('hat'); // A random number for new recipe

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
