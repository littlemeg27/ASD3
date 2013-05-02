//Brenna Pavlinchak
//CRUD Project
//ASD 1304

            $('#home').on("pageinit", function()
            {
            
            });
            
            $('#addItem').on("pageinit", function() //Start to add item page 
            {
                    var saveData = function()
                    {
                         var key;
                         var gameId;
               
                         if(!key)
                         {
                            gameId = Math.floor(Math.random()*1000001);    
                         }
                         
                         else
                         {
                             gameId = key;
                         }
                         
                         var item = {}; //Defining the array to save
                             item.lastName = 		[$("#lastName").val()]; //Storing lastName into the array
                             item.phoneNumber = 	[$("#phoneNumber").val()]; //Storing phoneNumber into the array 
                             item.numberOfPeople =  [$("#numberOfPeople").val()]; //Storing numberOfPeople into the array
                             item.park = 			[$("#park").val()]; //Storing park into the array
                             //We have to save one item at a time to be able to save the data into the array.
                         
                         $.couchdb('project4asd').saveDoc(item, 
                         {
                           success: function(data) 
                           {
                                console.log(data);
                                alert("The game was saved!");
                           },
                           
                           error: function(status) 
                           {
                               console.log(status);
                               alert("Something went wrong");
                           }
                         });
                    }; 
            });

            
            $('#dataPage').on("pageshow", function() 
            {
                $.couch.db('project4asd').view("app/game", 
                {
                    success: function(data)
                    {
                        $('#gameList').empty();
                        $.each(data.rows, function(index, value)
                        {
                            var item = (value.value || value.doc);
                            $('#gameList').append(
                            $('<li>').append(
                            $('<a>').attr("href", "lastName.html?lastName=" + item.lastName)
                                    .text(item.lastName)
                                            )        
                                                 );
                        });
                        $('#gameList').listview('refresh');
                    }
                 });
            }); //End of dataPage

            
            $(document).on('pageshow', '#lastName', function() //Start of lastName.html js code
            {
                var urlVars = function()
                { 
                    var urlData = $($.mobile.activePage).data("url");
                    //console.log(urlData, "urlData");
                    var urlParts = urlData.split('?');
                    //console.log(urlParts, "urlParts");
                    var urlPairs = urlParts[1].split('&');
                    //console.log(urlPairs, "urlPairs");
                    var urlValues = {};
                    //console.log(urlValues, "urlValues");
                    
                        for(var pair in urlPairs)
                        {
                            var keyValue = urlPairs[pair].split('=');
                            //console.log(keyValue, "keyValue");
                            var key = decodeURIComponent(keyValue[0]);
                            //console.log(key, "key");
                            var value = decodeURIComponent(keyValue[1]);
                            //console.log(value, "value");
                            urlValues[key] = value;
                            //console.log(urlValues, "urlValues");
                        }
                        return urlValues;
                }; //End of urlVars function
                
                 var lastName = urlVars()["lastName"]; //Function to call lastNames
                 //console.log(lastName, "lastName");
                 
                       $.couch.db('project4asd').view("app/game",
                       {    
                          success: function(data) //Going to use dataCall for the name to call my data
                          {  
                              $('#gameList').empty();
                              $.each(data.rows, function(index, game)
                              {
                                  var item = (game.value || game.doc);
                                  $('#gameList').append(
                                  $('<li>').append(
                                  $('<a>').attr("href", "#") //Trying to display all info
                                                 .html(
                                                         '<li>'+ game.value.lastName +'</li>'+
                                                         '<li>'+ game.value.phoneNumber +'</li>'+
                                                         '<li>'+ game.value.numberOfPeople +'</li>'+
                                                         '<li>'+ game.value.park +'</li>' +
                                                         '<button data-role="button" id="editItem" data-key="">Edit</button>' +
                                                         '<button data-role="button" id="deleteItem" data-key="">Delete</button>' 
                                                       )
                                                  )
                                                            );
                               });
                               $('#lastNameList').listview('refresh');
                          }               
                      });
                 
                 /*  $('#dataPage').on("pageshow", function()
                   {
                         $.couch.db('project4asd').removeDoc(
                         {
                             _id: id,
                             _rev: rev
                             
                             success: function(data) 
                             {
                                 console.log(data);
                                 alert("Game has been deleted!");
                             },
                             
                             error: function(status) 
                             {
                                 alert("Something went wrong")
                                 console.log(status);
                             }
                          }); 
                     });*/
                 
            }); //End of lastName.html js code.


