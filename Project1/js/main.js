//Brenna Pavlinchak
//CRUD Project
//ASD 1304
 

        $('#home').on('pageinit', function()
        {

                        
        });
        
        
        
        $('#addItem').on('pageinit', function()
        {
                            
              var storeData = function(data) 
              {
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
                        item.lastName = [$("#lastName").val()]; //Storing lastName into the array
                        item.phoneNumber = [$("#phoneNumber").val()]; //Storing phoneNumber into the array 
                        item.numberOfPeople = [$("#numberOfPeople").val()]; //Storing numberOfPeople into the array
                        item.park = [$("#park").val()]; //Storing park into the array
                        //We have to save one item at a time to be able to save the data into the array.
                    
                    localStorage.setItem(id, JSON.stringify(item));
                    alert("The game was saved.");
              };


              var myForm = $('#waitForm');
              var errorFormLink = $('#errorFormLink');
            
                myForm.validate(
                {
                        invalidHandler: function(form, validator, storeData) 
                        {
                            errorFormLink.click();
                            var html = '';
                            
                            for(var key in validator.submitted)
                            {
                                var label = $('[for^="'+ key +'"]');
                                var legend = label.closest('fieldset').find('.ui-controlgroup-label');
                                var fieldName = legend.length ? legend.text() : label.text();
                                html += '<li>'+fieldName+'</li>';
                            }
                            
                            $("#errorFormPage ul").html(html);
                        },
                        
                        submitHandler: function() 
                        {
                            var data = myForm.serializeArray();
                            storeData(data);
                        }
                });

              
               $('#deleteData').on('click', function(key) 
               {   
                   localStorage.clear(key);      
                   alert("All the games were deleted");
               });
                       
        });
        
        $('#dataPage').on('pageinit', function(item, data, key, storeData)
        {
            //var foo = 0; //-If you use this to control the if else then this works for the json.
            //if(foo == 0) //-Please use to test. Not sure why its not showing pre saved games
            if(localStorage.length === 0)
            {
            alert("Showing pre stored games");
            $("#gameList").empty();
        
            $.ajax({    
                       url: 'xhr/data.json', //What i am getting
                       type: 'GET', //We are getting not posting  
                       dataType: 'json', //Getting JSON data, located in data.json   
                       success: function(data)
                       {  
                              for(var i=0, j=data.json.length; i<j; i++)//for loop to read the whole json
                              {
                                    var game = data.json[i];
                                    
                                    $(''+
                                    '<li>'+ game.lastName +'</li>'+
                                    '<li>'+ game.phoneNumber +'</li>'+
                                    '<li>'+ game.numberOfPeople +'</li>'+
                                    '<li>'+ game.park +'</li>'
                                    ).appendTo("#gameList").listview();
                              }
                              $('#gameList').listview('refresh');
                        } 
                     });
                
                 } 
            
            else
            {
                alert("Showing stored games"); //When i run this for some reason i have to refresh to make the new game appear
                
                for(var i=0, j=localStorage.length; i<j; i++) //for loop to read the whole json
                { //We are reading localStorage for item so that we can:
                    var key = localStorage.key(i); //Grab the key for the item so that we can find the spot in local storage
                    var value = localStorage.getItem(key); //Once we find the key we pull the value from local storage
                    var list = JSON.parse(value); //Parsing the json and set it to list                
                    //Parsing-Takes a well-formed JSON string and returns the resulting JavaScript object.

                     $(''+
                     '<li>'+ list.lastName +'</li>'+
                     '<li>'+ list.phoneNumber +'</li>'+
                     '<li>'+ list.numberOfPeople +'</li>'+
                     '<li>'+ list.park +'</li>' +
                     '<button data-role="button" id="editItem" data-key=" ' + key + ' ">Edit</button>' +
                     '<button data-role="button" id="deleteItem" data-key=" ' + key + ' ">Delete</button>' 
                     ).appendTo("#gameList").listview(); //Appending to the li  
                     console.log(editItem);
                }
                $('#gameList').listview('refresh');
            }
            
          
            $('#deleteItem').on('click', function() 
             {  
                    localStorage.removeItem($(this).attr('key'));
                   //Grab item with the key
                   //Delete the item in localStorage
                   alert("Game was deleted");
             });
             
             $('#editItem').on('click', function(item) 
             {   
                   key = $(this).data('key'); //Grab item with the key
                   //storeData(key);
                   //var newKey = $(this).attr("key"); 
                   var newValue = localStorage.getItem($(this).attr("key")); //Pull them up in the form
                   var item = JSON.parse(newValue); //Parse so you can read
                   
                   $('#lastName').val(list.lastName[1]); //Storing lastName back into the array
                   $('#phoneNumber').val(list.phoneNumber[1]); //Storing phoneNumber back into the array
                   $('#numberOfPeople').val(list.numberOfPeople[1]); //Storing numberOfPeople back into the array
                   $('#park').val(list.park[1]); //Storing park back into the array
                   //We have to save one item at a time to be able to save the data into the array.
                   
                   localStorage.removeItem(key); //Save over the old key 
                   alert("Game was edited!");
             });

         });
         
       
       
        $('#ajaxPage').on('pageinit', function()
        {
          
        
          $("#ajaxList").empty();
          
          $.ajax({
                    url: 'xhr/data.xml',
                    type: 'GET',
                    dataType: 'xml',
                    success: function(xml)
                    {
                           console.log(xml);
                            
                            $(xml).find('ajax').each(function()
                            {
                              var xml = {};
                              xml.lastName       = $(this).find('lastName').text();
                              xml.phoneNumber    = $(this).find('phoneNumber').text();
                              xml.numberOfPeople = $(this).find('numberOfPeople').text();
                              xml.park           = $(this).find('park').text();
                              
                              
                              $(''+
                                '<li>'+ xml.lastName +'</li>'+
                                '<li>'+ xml.phoneNumber +'</li>'+
                                '<li>'+ xml.numberOfPeople +'</li>'+
                                '<li>'+ xml.park +'</li>'
                                ).appendTo('#ajaxList');
                            });
                            $('#ajaxList').listview('refresh');
                    }   
                });  
           
        }); 