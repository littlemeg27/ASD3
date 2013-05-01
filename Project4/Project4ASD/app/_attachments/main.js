//Brenna Pavlinchak
//CRUD Project
//ASD 1304

            $('#home').on("pageinit", function()
            {
            
            });
            
            $('#addItem').on("pageinit", function() //Start to add item page 
            {
               
                $('#saveData').on("click", function()
                {
                    var doc = {};
                    $.couch.db("project4asd").saveDoc(doc, function()
                    {
                        success: function(data) 
                        {
                            console.log(data);
                            
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
                                item.lastName = [$("#lastName").val()]; //Storing lastName into the array
                                item.phoneNumber = [$("#phoneNumber").val()]; //Storing phoneNumber into the array 
                                item.numberOfPeople = [$("#numberOfPeople").val()]; //Storing numberOfPeople into the array
                                item.park = [$("#park").val()]; //Storing park into the array
                                //We have to save one item at a time to be able to save the data into the array.
                            
                            couchdb().saveDoc(gameId, JSON.stringify(item));
                            alert("The game was saved.");
                        },
                        
                        error: function(status) 
                        {
                            alert("Something went wrong");
                        }
                    });
                });
            
            });

            
            $('#dataPage').on("pageshow", function()
            {
                $.couch.db("project4asd").view("app/game", 
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
            });

            
            $(document).on('pageshow', '#lastName', function()
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
                };
                
                 var lastName = urlVars()["lastName"];  
                 //console.log(lastName, "lastName");
                 
                       $.couch.db("project4asd").view("app/game",
                       {    
                          success: function(data) //Going to use dataCall for the name to call my data
                          {  
                             $.each(data.rows, function(index, game)
                             {
                                 var lastName         = game.value.lastName;
                                 var numberOfPeople   = game.value.numberOfPeople;
                                 var phoneNumber      = game.value.phoneNumber;
                                 var park             = game.value.park;
                                         
                                 $('#lastNameList').append(
                                 $('<li>').append( 
                                         $('<a>').attr("href", "#")
                                                 .html(
                                                         '<li>'+ lastName +'</li>'+
                                                         '<li>'+ phoneNumber +'</li>'+
                                                         '<li>'+ numberOfPeople +'</li>'+
                                                         '<li>'+ park +'</li>' +
                                                         '<button data-role="button" id="editItem" data-key="">Edit</button>' +
                                                         '<button data-role="button" id="deleteItem" data-key="">Delete</button>' 
                                                       )
                                                  )
                                                            );
                               });
                               $('#lastNameList').listview('refresh');
                          }               
                      });
                 
            /*     $('#dataPage').on("pageshow", function()
                   {
                         $.couch.db("project4asd").removeDoc(
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
                 
            });




