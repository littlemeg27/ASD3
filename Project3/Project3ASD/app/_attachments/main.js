//Brenna Pavlinchak
//CRUD Project
//ASD 1304
 

        $('#home').on('pageinit', function()
                {
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
                                            
                                            $('#gameList').append(
                                            $('<li>').append(
                                            $('<a>').attr("href", "#")
                                            		.text(lastName)
                                            				)
                                            							);
                                                    
                                        });
                                        $('#gameList').listview('refresh');
                
                                    }               
                            });
                            
                });
       