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
                         var id;
               
                         if(!key)
                         {
                            id = Math.floor(Math.random()*1000001);    
                         }
                         
                         else
                         {
                             id = key;
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
                //var gameID = _id; //Have to figure out why this is coming up undefined
                //var gameRev = _rev; //Also coming up undefined
                
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
                                                         '<button data-role="button" id="editItem">Edit</button>' +
                                                         '<button data-role="button" id="deleteItem">Delete</button>'
                                                         /*'<button data-role="button" id="editItem"  data-id=" ' + gameID + ' " data-rev=" ' + gameRev + ' ">Edit</button>' +
                                                         '<button data-role="button" id="deleteItem" data-id=" ' + gameID + ' " data-rev=" ' + gameRev + ' ">Delete</button>'*/ 
                                                         //Above are the buttons with the rev and id. 
                                                        )
                                                  )
                                                            );
                               });
                               $('#lastNameList').listview('refresh');
                          }               
                      });
                 
                   
                    
                      /* $('#deleteItem').on('click', function() //deleteButton
                       {
                           var askForPermission = confirm("Do you want to delete this game?");
                           
                           if(askForPermission) 
                           {
                                   $.couch.db('lastName').removeDoc(
                                   {
                                       _id:  gameID, 
                                       _rev: gameRev
                                   },
                                   {
                                       success: function(item) 
                                       {
                                           alert('The game was deleted!');
                                           console.log(item);
                                       },
                                       error: function(status) 
                                    {
                                        alert("Something went wrong");
                                        console.log(status);
                                    }
                                   });
                            }
                        });
                       
                       $('#editItem').on('click', function() //editButton
                       { //Having to rethink this, going to copy in the old edit.
                          
                               $.couch.db("project4asd").openDoc("gameID", //Opening up form
                               {
                                    success: function(item) 
                                    {
                                        console.log(item);
                                        alert("Whoot it worked!");
                                    },
                                    error: function(status) 
                                    {
                                        console.log(status);
                                        alert("Something went wrong!");
                                    }
                                }); //Pull them up in the form
                               
                               var item = //Saving updated form
                               {
                                        _id: "gameID";
                                        _rev: "gameRev"; //These lines are coming out weird, might have to redo
                                        $('#lastName').val(item.lastName[1]); //Storing lastName back into the array
                                        $('#phoneNumber').val(item.phoneNumber[1]); //Storing phoneNumber back into the array
                                        $('#numberOfPeople').val(item.numberOfPeople[1]); //Storing numberOfPeople back into the array
                                        $('#park').val(item.park[1]); //Storing park back into the array
                                        //We have to save one item at a time to be able to save the data into the array.
                                });
                       
                               $.couch.db("project4asd").saveDoc(item, 
                               {
                                        success: function(item) 
                                        {
                                            console.log(item);
                                            alert("Whoot it worked!");
                                        },
                                        error: function(status) 
                                        {
                                            console.log(status);
                                            alert("Something went wrong!");
                                        }
                                });
                             
                               alert("Game was edited!");
                          });*/
                       
            }); //End of lastName.html js code.
