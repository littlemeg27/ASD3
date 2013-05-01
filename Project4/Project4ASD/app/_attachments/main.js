//Brenna Pavlinchak
//CRUD Project
//ASD 1304

            $('#home').on("pageinit", function()
            {
            
            });
            
          /*  $('#addItem').on("pageinit", function() //Start to add item page 
            {
                var doc = {};
                $.couch.db("project4asd").saveDoc(doc,
                {
                    success: function(data) 
                    {
                        console.log(data);
                        alert("Game has been saved");
                    },
                    
                    error: function(status) 
                    {
                        alert("Something went wrong");
                        console.log(status);
                    }
                });
            
            }*/

            
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
                
                
          /*      $.couch.db("project4asd").removeDoc(
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
               }); */ //Move this to the last page lastName
            
            });

            
            $(document).on('pageshow', '#lastName', function()
            {
                var urlVars = function()
                { 
                    var urlData = $($.mobile.activePage).data("url");
                    console.log(urlData, "urlData");
                    var urlParts = urlData.split('?');
                    console.log(urlParts, "urlParts");
                    var urlPairs = urlParts[1].split('&');
                    console.log(urlPairs, "urlPairs");
                    var urlValues = {};
                    console.log(urlValues, "urlValues");
                    
                        for(var pair in urlPairs)
                        {
                            var keyValue = urlPairs[pair].split('=');
                            console.log(keyValue, "keyValue");
                            var key = decodeURIComponent(keyValue[0]);
                            console.log(key, "key");
                            var value = decodeURIComponent(keyValue[1]);
                            console.log(value, "value");
                            urlValues[key] = value;
                            console.log(urlValues, "urlValues");
                        }
                        return urlValues;
                };
            	
                 var lastName = urlVars()["lastName"];  
                 console.log(lastName, "lastName");
                 
                 $.ajax(
                         {    
                                 url: "_view/game", //What i am getting 
                                 dataType: "json", //Getting JSON data, located in data.json   
                                 success: function(data) //Going to use dataCall for the name to call my data
                                  {  
                                     $.each(data.rows, function(index, game)
                                     {
                                         var lastName         = game.value.lastName;
                                         var numberOfPeople   = game.value.numberOfPeople;
                                         var phoneNumber      = game.value.phoneNumber;
                                         var park             = game.value.park;
                                         
                                         $('#lastNameList').append(
                                         $('<li>').append( //Not gonna work think way have to rethink it
                                         $('<a>').attr("href", "#")
                                         		.text(
                                         				'<li>'+ game.lastName +'</li>'+
                                         	            '<li>'+ game.phoneNumber +'</li>'+
                                         	            '<li>'+ game.numberOfPeople +'</li>'+
                                         	            '<li>'+ game.park +'</li>' +
                                         	            '<button data-role="button" id="editItem" data-key=" ' + rev + ' ">Edit</button>' +
                                         	            '<button data-role="button" id="deleteItem" data-key=" ' + rev + ' ">Delete</button>' 
                                         	            ).appendTo("#lastNameList").listview(); //Appending to the li  

                                         				)
                                         				)
                                         							);
                                                 
                                     });
                                     $('#lastNameList').listview('refresh');
             
                                 }               
                         });
            });






