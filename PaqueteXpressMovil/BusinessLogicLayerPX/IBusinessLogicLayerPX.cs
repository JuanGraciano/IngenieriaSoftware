using System;
using System.Collections.Generic;

namespace BusinessLogicLayerPX
{
	public interface IBusinessLogicLayerPX
	{
		/// <summary>
		/// Authenticates the user.
		/// </summary>
		/// <returns><c>true</c>, if user was authenticated, <c>false</c> otherwise.</returns>
		/// <param name="id">Identifier.</param>
		/// <param name="pass">Password.</param>
		/// <exception cref="System.Net.WebException">When the server doesn't respond.</exception>
		bool AuthenticateUser(string id, string pass);

		/// <summary>
		/// Gets the user. If the user is not valid, dispose of the current user.
		/// </summary>
		/// <returns>The user.</returns>
		/// <exception cref="UnauthorizedAccessException">If not valid user is active.</exception>
		/// <exception cref="System.Net.WebException">When the server doesn't respond.</exception>
		VOUser GetUser();

		/// <summary>
		/// Gets the delivery orders.
		/// </summary>
		/// <returns>The delivery orders.</returns>
		/// <exception cref="UnauthorizedAccessException">If user is not a delivery, the message will be "User is not a delivery". If the user is not authenticated, The message will be left empty.</exception>
		/// <exception cref="System.Net.WebException">When the server doesn't respond.</exception>
		List<VOOrder> GetDeliveryOrders();

		/// <summary>
		/// Resets the current user.
		/// </summary>
		void ResetUser();

		/// <summary>
		/// Gets the seller orders.
		/// </summary>
		/// <returns>The seller orders.</returns>
		/// <exception cref="UnauthorizedAccessException">If user is not a seller, the message will be "User is not a seller". If the user is not authenticated, The message will be left empty.</exception>
		/// <exception cref="System.Net.WebException">When the server doesn't respond.</exception>
		List<VOOrder> GetSellerOrders();

		/// <summary>
		/// Changes the status.
		/// </summary>
		/// <returns><c>true</c>, if status was changed, <c>false</c> otherwise.</returns>
		/// <param name="status">Status.</param>
		/// <exception cref="UnauthorizedAccessException">If not valid user is active.</exception>
		/// <exception cref="System.Net.WebException">When the server doesn't respond.</exception>
		bool ChangeStatus(string status);

		/// <summary>
		/// Gets the order.
		/// </summary>
		/// <returns>The order.</returns>
		/// <param name="id">Identifier.</param>
		/// <exception cref="UnauthorizedAccessException">If not valid user is active.</exception>
		/// <exception cref="System.Net.WebException">When the server doesn't respond.</exception>
		VOOrder GetOrder(string id);

		/// <summary>
		/// Creates the order.
		/// </summary>
		/// <returns><c>true</c>, if order was created, <c>false</c> otherwise.</returns>
		/// <param name="order">Order to create.</param>
		/// <exception cref="NullReferenceException"></exception>
		/// <exception cref="UnauthorizedAccessException">If not valid user is active or the active user is not a seller.</exception>
		/// <exception cref="InvalidOperationException">If order id is already in the database</exception>
		bool CreateOrder(VOOrder order);

		/// <summary>
		/// Gets the product.
		/// </summary>
		/// <returns>The product or null if the product doesn't exists.</returns>
		/// <param name="id">Identifier.</param>
		/// <exception cref="UnauthorizedAccessException">If not valid user is active.</exception>
		VOProduct GetProduct(string id);

		/// <summary>
		/// Gets all products id.
		/// </summary>
		/// <returns>All the products id (Only returns name, price and id).</returns>
		/// <exception cref="UnauthorizedAccessException">If not valid user is active.</exception>
		Dictionary<string,VOProduct> GetAllProducts();

		/// <summary>
		/// Confirms the order delivered.
		/// </summary>
		/// <returns><c>true</c>, if order delivered was confirmed, <c>false</c> otherwise.</returns>
		/// <param name="id">Identifier.</param>
		/// <param name="image">Image.</param>
		bool ConfirmOrderDelivered(string id, Byte[] image);
	}
}
