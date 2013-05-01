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
               }); */
            
            });

            
            $(document).on('pageshow', '#lastName', function()
            {
                var urlVars = function()
                { 
                    var urlData = $($.mobile.activePage).data("url");
                    console.log(urlData);
                    var urlParts = urlData.split('?');
                    console.log(urlParts);
                    console.log(urlParts[2]);
                    var urlPairs = urlParts[1].split('&');
                    var urlValues = {};
                    
                        for(var pair in urlPairs)
                        {
                            var keyValue = urlPairs[pair].split('=');
                            var key = decodeURIComponent(keyValue[0]);
                            var value = decodeURIComponent(keyValue[1]);
                            urlValues[key] = value;
                        }
                        return urlValues;
                };
            	
                 var lastName = urlVars()["item.lastName"];    
            });






