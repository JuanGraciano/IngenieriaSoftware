using System;
using System.Collections.Generic;

namespace BusinessLogicLayerPX
{
	public class BusinessLogicLayerPXTest: IBusinessLogicLayerPX
	{
		VOUser user = null;

		private static IBusinessLogicLayerPX uniqueInstance= null;

		private BusinessLogicLayerPXTest()
		{
		}

		public static IBusinessLogicLayerPX GetUniqueInstance()
		{
			if (uniqueInstance == null)
				uniqueInstance = new BusinessLogicLayerPXTest();
			return uniqueInstance;
		}

		public bool AuthenticateUser(string id, string pass)
		{
			user = new VOUser()
			{
				Token = "2942340232", Status = "Unavailable",
				Id = "dsfddsfas233", Role = "Seller"
			};

			return true;
		}

		public bool ChangeStatus(string status)
		{
			if (user != null)
			{
				user.Status = status;
				return true;
			}
			else
				throw new UnauthorizedAccessException();
		}

		public List<VOOrder> GetDeliveryOrders()
		{
			return new List<VOOrder>()
			{
				new VOOrder(){
					Id = "dsfdsfs", IdClient = "sdafasf",
					ProductList = new Dictionary<string, int>(){
						{"producto1", 10},{"producto2", 20}
					},
					Date = DateTime.Now, Status = "Listo para entregar"
				},
				new VOOrder(){
					Id = "dfa", IdClient = "sda454fasf",
					ProductList = new Dictionary<string, int>(){
						{"producto3", 30},{"producto4", 40}
					},
					Date = DateTime.Now, Status = "Listo para entregar"
				}
			};
		}

		public VOOrder GetOrder(string id)
		{
			return new VOOrder()
			{
				Id = id,
				IdClient = "sdafasf",
				ProductList = new Dictionary<string, int>(){
						{"producto1", 10},{"producto2", 20}
					},
				Date = DateTime.Now,
				Status = "Listo para entregar"
			};
		}

		public List<VOOrder> GetSellerOrders()
		{
			return new List<VOOrder>()
			{
				new VOOrder(){
					Id = "dsfdsfs", IdClient = "sdafasf",
					ProductList = new Dictionary<string, int>(){
						{"producto1", 10},{"producto2", 20}
					},
					Date = DateTime.Now, Status = "Listo para entregar"
				},
				new VOOrder(){
					Id = "dfa", IdClient = "sda454fasf",
					ProductList = new Dictionary<string, int>(){
						{"producto3", 30},{"producto4", 40}
					},
					Date = DateTime.Now, Status = "Listo para entregar"
				}
			};
		}

		public VOUser GetUser()
		{
			if (user != null)
				return user;
			else
				throw new UnauthorizedAccessException();
		}

		public void ResetUser()
		{
			user = null;
		}

		public bool CreateOrder(VOOrder order)
		{
			throw new NotImplementedException();
		}

		public VOProduct GetProduct(string id)
		{
			throw new NotImplementedException();
		}

		public Dictionary<string, VOProduct> GetAllProducts()
		{
			throw new NotImplementedException();
		}

		public bool ConfirmOrderDelivered(string id, byte[] image)
		{
			throw new NotImplementedException();
		}
	}
}
