//Brenna Pavlinchak
//CRUD Project
//ASD 1304
 

        $('#home').on('pageinit', function()
        {

                        
        });
        
        $('#addItem').on('pageinit', function()
        {
        
              $('#saveData').on('click', function()
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
              });
              
               $('#deleteData').on('click', function(key) 
               {   
                   localStorage.clear(key);      
                   alert("All the games were deleted");
               });
                       

                        
        });
        
        $('#dataPage').on('pageinit', function(item, data, key)
        {
            var foo = 0;
            if(foo == 1)
            {
            $("#gameList").empty();
        
            $.ajax({    
                       url: 'xhr/data.json', //What i am getting
                       type: 'GET', //We are getting not posting  
                       dataType: 'json', //Getting JSON data, located in data.json   
                       success: function(data)
                       {  
                              for(var i=0, j=localStorage.length; i<j; i++)//for loop to read the whole json
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
                alert("Showing stored games"); 
                
                for(var i=0, j=localStorage.length; i<j; i++) //for loop to read the whole json
                { //We are reading localStorage for item so that we can:
                    key = localStorage.key(i); //Grad the key for the item so that we can find the spot in local storage
                    var value = localStorage.getItem(key); //Once we find the key we pull the value from local storage
                    var list = JSON.parse(value); //Parsing the json and set it to list                
                    //Parsing-Takes a well-formed JSON string and returns the resulting JavaScript object.

                     $(''+
                     '<li>'+ list.lastName +'</li>'+
                     '<li>'+ list.phoneNumber +'</li>'+
                     '<li>'+ list.numberOfPeople +'</li>'+
                     '<li>'+ list.park +'</li>'
                     //"<a href='#' class='editItem'></a>""<a href='#' class='deleteItem'></a>"-Doesnt like
                     //Trying to make the links for each contact
                     ).appendTo("#gameList").listview(); //Appending to the li
                     //"<a href='#' key='' class='editItem'></a>"-Didnt work
                     //$('<a href="#" id="editItem" </a>').appendTo('#gamelist'); -Changed the li its being appended to didnt show up
                     //$('<a href="#" id="editItem"</a>').appendTo('#buttons'); -Appending to a different li but it didnt show up.
                }
                $('#gameList').listview('refresh');
            }
            
             $('#deleteData').on('click', function(key) 
             {   
               localStorage.clear(key);      
               alert("All the games were deleted");
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










