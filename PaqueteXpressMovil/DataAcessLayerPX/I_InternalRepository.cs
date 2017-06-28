using System;
using System.Collections.Generic;

namespace DataAcessLayerPX
{
	public interface I_InternalRepository
	{
		bool AddOrder(string id, string idUser, string idClient, Dictionary<string, int> productList,
									   double latitude, double longitude, DateTime date, string status);
		List<string> GetOrderIdList();

		Order GetAndRemoveOrder(string id);
	}
}
