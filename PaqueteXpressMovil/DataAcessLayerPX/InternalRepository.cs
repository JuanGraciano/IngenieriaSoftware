using System;
using System.Collections.Generic;

namespace DataAcessLayerPX
{
	public class InternalRepository: I_InternalRepository
	{
		private static InternalRepository uniqueInstance = null;

		public Dictionary<string, Order> ordersToPost;

		InternalRepository()
		{
			ordersToPost = new Dictionary<string, Order>();
		}

		public static InternalRepository getUniqueInstance()
		{
			if (uniqueInstance == null)
				uniqueInstance = new InternalRepository();
			
			return uniqueInstance;
		}

		public bool AddOrder(string id, string idUser, string idClient, 
		                     Dictionary<string, int> productList, double latitude, double longitude, DateTime date, 
		                     string status)
		{
			if (ordersToPost.ContainsKey(id))
				ordersToPost.Remove(id);

			ordersToPost.Add(id, new Order()
			{
				Id = id,
				IdUser = id,
				IdClient = idClient,
				ProductList = productList,
				Latitude = latitude,
				Longitude = longitude,
				Date = date,
				Status = status
			});	

			return true;                 
		}

		public Order GetAndRemoveOrder(string id)
		{
			Order order = null;

			ordersToPost.TryGetValue(id, out order);

			if (order != null)
				ordersToPost.Remove(id);

			return order;
		}

		public List<string> GetOrderIdList()
		{
			return new List<string>(ordersToPost.Keys);
		}
	}
}
