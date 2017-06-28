using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace DataAcessLayerPX
{
	public class DataAcessLayerPX : IDataAcessLayerPX
	{
		private static DataAcessLayerPX uniqueInstance = null;

		I_InternalRepository internalRepository = null;

		static HttpClient client = new HttpClient();

		public DataAcessLayerPX()
		{
			client.BaseAddress = new Uri("http://162.243.173.162:3000/");
			client.DefaultRequestHeaders.Accept.Clear();
			client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
			client.DefaultRequestHeaders.Accept.Add(
				new MediaTypeWithQualityHeaderValue("application/x-www-form-urlencoded"));

			internalRepository = InternalRepository.getUniqueInstance();
		}

		/// <summary>
		/// Gets the unique instance of the class. Creates a new instance if it doesn't exists.
		/// </summary>
		/// <returns>The unique instance of the class.</returns>
		public static DataAcessLayerPX GetUniqueInstance()
		{
			if (uniqueInstance == null)
				uniqueInstance = new DataAcessLayerPX();
			return uniqueInstance;
		}

		/// <summary>
		/// Waits for the response and return it.
		/// </summary>
		/// <returns>The response.</returns>
		/// <param name="path">Path with parameters.</param>
		private HttpResponseMessage Get(string path)
		{
			return Utility.HandleRequest(() => client.GetAsync(path).Result);
		}

		private HttpResponseMessage Post(string path, HttpContent content)
		{
			return Utility.HandleRequest(() => client.PostAsync(path, content).Result);
		}

		private HttpResponseMessage Put(string path, HttpContent content)
		{
			return Utility.HandleRequest(() => client.PutAsync(path, content).Result);
		}

		public HttpResponseMessage AuthenticateUser(string id, string pass)
		{
			var path = "authenticate";

			var content = new FormUrlEncodedContent(new[]
			{
				new KeyValuePair<string, string>("username", id),
				new KeyValuePair<string, string>("password", pass)
			});

			return Post(path, content);
		}

		public HttpResponseMessage GetUser(string token)
		{
			var path = "api/current";

			return Get(Utility.JoinParameter2Path(path, new Dictionary<string, string>
			{
				{"token", token}
			}));
		}

		public HttpResponseMessage GetDeliveryOrders(string token)
		{
			var path = "api/orders_assigned";

			return Get(Utility.JoinParameter2Path(path, new Dictionary<string, string>
			{
				{"token", token}
			}));
		}

		public HttpResponseMessage GetSellerOrders(string token)
		{
			var path = "api/orders";

			return Get(Utility.JoinParameter2Path(path, new Dictionary<string, string>
			{
				{"token", token}
			}));
		}

		public HttpResponseMessage ChangeStatus(string token, string status)
		{
			var path = "api/users";

			var content = new FormUrlEncodedContent(new[]
			{
				new KeyValuePair<string, string>("status", status)
			});

			return Put(Utility.JoinParameter2Path(path, new Dictionary<string, string>
			{
				{"token", token}
			}), content);
		}

		public HttpResponseMessage GetOrder(string token, string orderId)
		{
			var path = "api/orders";

			return Get(Utility.JoinParameter2Path(path, new Dictionary<string, string>
			{
				{"token", token},
				{"idOrder", orderId}
			}));
		}


		public HttpResponseMessage GetProduct(string token, string id)
		{
			var path = "api/products";

			return Get(Utility.JoinParameter2Path(path, new Dictionary<string, string>
			{
				{"IdProduct", id}, {"token", token}
			}));
		}

		public HttpResponseMessage GetProducts(string token)
		{
			var path = "api/products";

			return Get(Utility.JoinParameter2Path(path, new Dictionary<string, string>
			{
				{"token", token}
			}));
		}

		//TODO send order id.
		HttpResponseMessage IDataAcessLayerPX.ConfirmOrderDelivered(string token, string id, byte[] image)
		{
			var path = "orders";

			MultipartFormDataContent form = new MultipartFormDataContent();

			var imageContent = new StreamContent(new MemoryStream(image));

			form.Add(imageContent, "image", "image.png");

			return Post(Utility.JoinParameter2Path(path, new Dictionary<string, string>
			{
				{"token", token}
			}), form);
		}

		HttpResponseMessage IDataAcessLayerPX.CreateOrder(string token, string idClient, Dictionary<string, int> productList, double latitude, double longitude, DateTime date, string status)
		{
			var path = "api/orders";

			var content = new StringContent(JsonConvert.SerializeObject(new
			{
				idClient,
				productList,
				address = JsonConvert.SerializeObject(new { latitude, longitude }),
				date,
				status
			}), Encoding.UTF8, "application/json");

			try
			{
				return Post(Utility.JoinParameter2Path(path, new Dictionary<string, string>
				{
					{"token", token}
				}), content);
			}
			catch (WebException ex)
			{
				//internalRepository.AddOrder(id, idUser, idClient, productList, latitude, longitude, date, status);

				throw ex;
			}
		}
	}
}
