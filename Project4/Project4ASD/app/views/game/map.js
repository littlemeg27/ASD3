function (doc)
{
	if (doc._id.substr(0,5)==="game:")
		{
			emit(doc._id.substr(5),
			{
			"lastName": doc.lastName,
			"phoneNumber": doc.phoneNumber,
			"game": doc.game,
			"numberOfPeople": doc.numberOfPeople
			});
		}
};