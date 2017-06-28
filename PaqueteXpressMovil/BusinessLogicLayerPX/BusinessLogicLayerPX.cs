using System;
using System.Collections.Generic;
using DataAcessLayerPX;
using Newtonsoft.Json;

namespace BusinessLogicLayerPX
{
	public class BusinessLogicLayerPX: IBusinessLogicLayerPX
	{
		static BusinessLogicLayerPX uniqueInstance = null;
		IDataAcessLayerPX DAL = null;
		VOUser user = null;

		private BusinessLogicLayerPX()
		{
			DAL = DataAcessLayerPX.DataAcessLayerPX.GetUniqueInstance();
			ResetUser();
			//DAL = new DataAcessLayerTest();
		}

		public static BusinessLogicLayerPX GetUniqueInstance()
		{
			if (uniqueInstance == null)
				uniqueInstance = new BusinessLogicLayerPX();
			return uniqueInstance;
		}

		public bool AuthenticateUser(string id, string pass)
		{
			var response = DAL.AuthenticateUser(id, pass);
			if (response.IsSuccessStatusCode)
			{
				var keyValue = JsonConvert.DeserializeObject<Dictionary<string,string>>(response.Content.ReadAsStringAsync().Result);

				string token = null;

				keyValue.TryGetValue("token", out token);

				user = new VOUser()
				{
					Token = token
				};
				               
				return true;

			}
			return false;

		}

		public VOUser GetUser()
		{

			Utility.CheckAuthentication(() => DAL.GetUser(user.Token), (res) =>
			{
				var keyValue = JsonConvert.DeserializeObject<VOUser>(res.Content.ReadAsStringAsync().Result);

				user.Status = keyValue.Status;
				user.Role = keyValue.Role;
				user.Id = keyValue.Id;

			}, this);

			return user;
		}

		public List<VOOrder> GetDeliveryOrders()
		{
			List<VOOrder> orderList = null;

			Utility.CheckAuthentication(() => DAL.GetDeliveryOrders(user.Token), (res) =>
			{
				orderList = JsonConvert.DeserializeObject<List<VOOrder>>(res.Content.ToString());
			}, this);

			return orderList;
		}

		public void ResetUser()
		{
			user = new VOUser() { Token = "" };
		}

		//TODO change function to get ordered list of order ids.
		public List<VOOrder> GetSellerOrders()
		{
			List<VOOrder> orderList = null;

			Utility.CheckAuthentication(() => DAL.GetSellerOrders(user.Token), (res) =>
			{
				var orders = JsonConvert.DeserializeObject<Dictionary<string,VOOrder>>(res.Content.ToString());
				foreach(var order in orders)
				{
					order.Value.Id = order.Key;
					orderList.Add(order.Value);
				}
			}, this);

			return orderList;
		}

		//TODO Return false if response incorrect (even though the user is logged).
		public bool ChangeStatus(string status)
		{
			bool changed = false;

			var resultMessage = new { result = false };

			Utility.CheckAuthentication(() => DAL.ChangeStatus(user.Token, status), (res) =>
			{
				resultMessage = JsonConvert.DeserializeAnonymousType(res.Content.ReadAsStringAsync().Result, resultMessage);
				changed = resultMessage.result;
			}, this);

			return changed;
		}

		public VOOrder GetOrder(string id)
		{
			VOOrder order = null;

			Utility.CheckAuthentication(() => DAL.GetOrder(user.Token, id), (res) =>
			{
				order = JsonConvert.DeserializeObject<VOOrder>(res.Content.ToString());
				if (order != null)
					order.Id = id;

			}, this);

			return order;
		}

		public bool CreateOrder(VOOrder order)
		{
			var resultMessage = new { result = false };

			Utility.CheckAuthentication(() => DAL.CreateOrder(user.Token, order.IdClient, order.ProductList,
			                                                  order.Address.Latitude, order.Address.Longitude, 
			                                                  order.Date, order.Status)
										, (res) =>
			 {
				 resultMessage = JsonConvert.DeserializeAnonymousType(res.Content.ReadAsStringAsync().Result, resultMessage);
			 }, this);

			return resultMessage.result;
		}

		public VOProduct GetProduct(string id)
		{
			VOProduct product = null;

			Utility.CheckAuthentication(() => DAL.GetProduct(user.Token, id), (res) =>
			{
				product = JsonConvert.DeserializeObject<VOProduct>(res.Content.ReadAsStringAsync().Result);
			}, this);

			return product;
		}

		public Dictionary<string, VOProduct> GetAllProducts()
		{
			Dictionary<string, VOProduct> products = null;

			Utility.CheckAuthentication(() => DAL.GetProducts(user.Token), (res) =>
			{
				products = JsonConvert.DeserializeObject<Dictionary<string,VOProduct>>(
					res.Content.ReadAsStringAsync().Result);

				foreach (var product in products)
					product.Value.ProductId = product.Key;
			}, this);

			return products;
		}

		//TODO
		public bool ConfirmOrderDelivered(string id, byte[] image)
		{
			var res = DAL.ConfirmOrderDelivered(user.Token, id, image);
			return true;
		}
	}
}
