//Brenna Pavlinchak
//CRUD Project
//ASD 1304

            $('#home').on("pageinit", function()
            {
            
            });

            
			$('#dataPage').on("pageinit", function()
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
           
            
            var urlVars = function()
            { 
                var urlData = $($.mobile.activePage).data("url");
                console.log(urlData)
                var urlParts = urlData.split('?');
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
			
            $(document).on('pageinit', '#lastName', function()
            {
                 var lastName = urlVars()["item.lastName"];
                 
                        
                 });