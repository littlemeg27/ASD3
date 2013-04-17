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
                    
                    var item = JSON.stringify(
                    {
                        "lastName"        : $("#lastName").val(),
                        "phoneNumber"     : $("#phoneNumber").val(),
                        "numberOfPeople"  : $("#numberOfPeople").val(),
                        "park"            : $("#park").val()
                    });
                    
                    localStorage.setItem(id, JSON.stringify(item));
                    alert("The game was saved.");
              });
                       

                        
        });
        
        $('#dataPage').on('pageinit', function(item, data)
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
                alert("im in the else"); 
                console.log("1", item);
                
                var list = localStorage.key(i)

                console.log("2", item);
            
                for(var i=0, j=localStorage.length; i<j; i++) //for loop to read the whole json
                {
                localStorage.getItem(JSON.parse(key)); //Getting from localStorage
                console.log("3", item);

                     $(''+
                     '<li>'+ list.lastName +'</li>'+
                     '<li>'+ list.phoneNumber +'</li>'+
                     '<li>'+ list.numberOfPeople +'</li>'+
                     '<li>'+ list.park +'</li>'
                     ).appendTo("#gameList").listview(); //Appending to the li
                }
                $('#gameList').listview('refresh');
              
            }
            
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












