//Brenna Pavlinchak
//CRUD Project
//ASD 1304

            $('#home').on("pageinit", function()
            {
            
            });
            
            $('#addItem').on("pageinit", function() //Start to add item page 
            {
                    $("#saveData").on('click', function()
                    {
                        console.log("Inside the start of save");
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
                             item.lastName =         [$("#lastName").val()]; //Storing lastName into the array
                             item.phoneNumber =      [$("#phoneNumber").val()]; //Storing phoneNumber into the array 
                             item.numberOfPeople =   [$("#numberOfPeople").val()]; //Storing numberOfPeople into the array
                             item.park =             [$("#park").val()]; //Storing park into the array
                             //We have to save one item at a time to be able to save the data into the array.
                         console.log("After storing the fields");
                         $.couch.db('project4asd').saveDoc(item, 
                         {
                           success: function(item) 
                           {
                                console.log(item);
                                alert("The game was saved!");
                           },
                           
                           error: function(status) 
                           {
                               console.log(status);
                               alert("Something went wrong");
                           }
                         });
                         alert("Something happened!!");
                    }); 
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
                var _id:  gameID;
                var _rev: gameRev;
                
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
                              $('#lastNameList').empty();
                              $.each(data.rows, function(index, value)
                              {
                                  var item = (value.value || value.doc);
                                  $('#lastNameList').append(
                                  $('<li>').append(
                                  $('<a>').attr("href", "#") //Trying to display all info 
                                                 .html(
                                                         '<li>'+ item.lastName +'</li>'+
                                                         '<li>'+ item.phoneNumber +'</li>'+
                                                         '<li>'+ item.numberOfPeople +'</li>'+
                                                         '<li>'+ item.park +'</li>' +
                                                         '<button data-role="button" id="editItem" data-id=" ' + gameID + ' " data-rev=" ' + gameRev + ' ">Edit</button>' +
                                                         '<button data-role="button" id="deleteItem" data-id=" ' + gameID + ' " data-rev=" ' + gameRev + ' ">Delete</button>' 
                                                       )
                                                  )
                                                            );
                               });
                               $('#lastNameList').listview('refresh');
                          }               
                      });
                 
                   
                    
                       $(document).on('click', '#deleteItem', function() //deleteButton
                       {
                           var ask = confirm("Do you want to delete this game?");
                           
                           if(ask) 
                           {
                                   $.couch.db('lastName').removeDoc(
                                   {
                                       _id:  gameID, 
                                       _rev: gameRev
                                   },
                                   {
                                       success: function() 
                                       {
                                           alert('The game was deleted!');
                                       },
                                       error: function(status) 
                                    {
                                        alert("Something went wrong");
                                        console.log(status);
                                    }
                                   });
                           }
                        });
                       
                       $(document).on('click', '#editItem', function() //editButton
                       {
                           $.couch.db('lastName').saveDoc(
                               {
                                   _id:gameID, 
                                   _rev: gameRev
                                   
                                   $('#lastName').val(value.lastName[1]); //Not sure if this is right, but 
                                   $('#phoneNumber').val(value.phoneNumber[1]); //Help would be awesome
                                   $('#numberOfPeople').val(value.numberOfPeople[1]); 
                                   $('#park').val(value.park[1]);
                               },
                               
                               {
                                   success: function() 
                                   {
                                       alert('You edited the contact!');
                                   },
                                   error: function(status) 
                                {
                                     alert("Something went wrong")
                                     console.log(status);
                                }
                               })
                       });
                       
            }); //End of lastName.html js code.
