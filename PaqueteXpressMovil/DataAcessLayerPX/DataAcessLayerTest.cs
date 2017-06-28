using System;
using System.Collections.Generic;
using System.Net.Http;

namespace DataAcessLayerPX
{
	public class DataAcessLayerTest: IDataAcessLayerPX
	{
		public DataAcessLayerTest()
		{
		}

		public HttpResponseMessage AuthenticateUser(string id, string pass)
		{
			var response = new HttpResponseMessage();
			response.StatusCode = System.Net.HttpStatusCode.Forbidden;

			return response;
		}

		public HttpResponseMessage GetUser(string token)
		{
			var response = new HttpResponseMessage();
			response.StatusCode = System.Net.HttpStatusCode.Forbidden;

			return response;
		}

		public HttpResponseMessage GetDeliveryOrders(string token)
		{
			var response = new HttpResponseMessage();
			response.StatusCode = System.Net.HttpStatusCode.Forbidden;

			return response;
		}

		public HttpResponseMessage GetSellerOrders(string token)
		{
			var response = new HttpResponseMessage();
			response.StatusCode = System.Net.HttpStatusCode.Forbidden;

			return response;
		}

		public HttpResponseMessage ChangeStatus(string token, string status)
		{
			var response = new HttpResponseMessage();
			response.StatusCode = System.Net.HttpStatusCode.Forbidden;

			return response;
		}

		public HttpResponseMessage GetOrder(string token, string orderId)
		{
			var response = new HttpResponseMessage();
			response.StatusCode = System.Net.HttpStatusCode.Forbidden;

			return response;
		}

		public HttpResponseMessage GetProduct(string token, string id)
		{
			throw new NotImplementedException();
		}

		HttpResponseMessage CreateOrder(string token, string idClient, Dictionary<string, int> productList,
									   double latitude, double longitude, DateTime date, string status)
		{
			throw new NotImplementedException();
		}

		public HttpResponseMessage GetProducts(string token)
		{
			throw new NotImplementedException();
		}

		HttpResponseMessage ConfirmOrderDelivered(string token, string id, Byte[] image)
		{
			throw new NotImplementedException();
		}

		HttpResponseMessage IDataAcessLayerPX.ConfirmOrderDelivered(string token, string id, byte[] image)
		{
			throw new NotImplementedException();
		}

		HttpResponseMessage IDataAcessLayerPX.CreateOrder(string token, string idClient, Dictionary<string, int> productList, double latitude, double longitude, DateTime date, string status)
		{
			throw new NotImplementedException();
		}
	}
}
