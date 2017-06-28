using System;
using System.Collections.Generic;
using System.Net.Http;

namespace DataAcessLayerPX
{
	public interface IDataAcessLayerPX
	{
		/// <summary>
		/// Authenticates the user.
		/// </summary>
		/// <returns>The user.</returns>
		/// <param name="id">Identifier.</param>
		/// <param name="pass">Pass.</param>
		/// <exception cref="System.Net.WebException">When the server doesn't respond.</exception>
		HttpResponseMessage AuthenticateUser(string id, string pass);

		/// <summary>
		/// Gets the user.
		/// </summary>
		/// <returns>The user.</returns>
		/// <param name="token">Token.</param>
		/// <exception cref="System.Net.WebException">When the server doesn't respond.</exception>
		HttpResponseMessage GetUser(string token);

		/// <summary>
		/// Gets the delivery orders.
		/// </summary>
		/// <returns>The delivery orders.</returns>
		/// <param name="token">Token.</param>
		/// <exception cref="System.Net.WebException">When the server doesn't respond.</exception>
		HttpResponseMessage GetDeliveryOrders(string token);

		/// <summary>
		/// Gets the seller orders.
		/// </summary>
		/// <returns>The seller orders.</returns>
		/// <param name="token">Token.</param>
		/// <exception cref="System.Net.WebException">When the server doesn't respond.</exception>
		HttpResponseMessage GetSellerOrders(string token);

		/// <summary>
		/// Changes the status.
		/// </summary>
		/// <returns>The status.</returns>
		/// <param name="token">Token.</param>
		/// <param name="status">Status.</param>
		/// <exception cref="System.Net.WebException">When the server doesn't respond.</exception>
		HttpResponseMessage ChangeStatus(string token, string status);

		/// <summary>
		/// Gets the order.
		/// </summary>
		/// <returns>The order.</returns>
		/// <param name="token">Token.</param>
		/// <param name="orderId">Order identifier.</param>
		/// <exception cref="System.Net.WebException">When the server doesn't respond.</exception>
		HttpResponseMessage GetOrder(string token, string orderId);

		/// <summary>
		/// Creates the order.
		/// </summary>
		/// <returns>The order.</returns>
		/// <param name="id">Identifier.</param>
		/// <param name="idUser">Identifier user.</param>
		/// <param name="idClient">Identifier client.</param>
		/// <param name="productList">Product list.</param>
		/// <param name="latitude">Latitude.</param>
		/// <param name="longitude">Longitude.</param>
		/// <param name="date">Date.</param>
		/// <param name="status">Status.</param>
		/// <exception cref="System.Net.WebException">When the server doesn't respond.</exception>
		HttpResponseMessage CreateOrder(string token, string idClient, Dictionary<string, int> productList,
									   double latitude, double longitude, DateTime date, string status);

		/// <summary>
		/// Gets the product.
		/// </summary>
		/// <returns>The product.</returns>
		/// <param name="token">Token.</param>
		/// <param name="id">Identifier.</param>
		/// <exception cref="System.Net.WebException">When the server doesn't respond.</exception>
		HttpResponseMessage GetProduct(string token, string id);

		/// <summary>
		/// Gets all the products.
		/// </summary>
		/// <returns>The all products.</returns>
		/// <param name="token">Token.</param>
		HttpResponseMessage GetProducts(string token);

		/// <summary>
		/// Confirms the order delivered.
		/// </summary>
		/// <returns>The server response.</returns>
		/// <param name="id">Identifier.</param>
		/// <param name="image">Image confirming that the order was delivered.</param>
		HttpResponseMessage ConfirmOrderDelivered(string token, string id, Byte[] image);
	}
}
