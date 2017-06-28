using System;
using System.Net.Http;
using Newtonsoft.Json;

namespace BusinessLogicLayerPX
{
	public class Utility
	{
		public Utility()
		{
		}

		public delegate void AuthorizedProcedure(HttpResponseMessage res);

		public delegate HttpResponseMessage GetResponse();

		/// <summary>
		/// Checks the authentication.
		/// </summary>
		/// <param name="getResponse">Function to get the response from the server.</param>
		/// <param name="proc">Function to execute if the user is authenticated.</param>
		/// <exception cref="UnauthorizedAccessException">If user is not authenticated.</exception>
		/// TODO only throw exception when user is not authenticate (only one status code) 
		public static void CheckAuthentication(GetResponse getResponse, AuthorizedProcedure proc, IBusinessLogicLayerPX bll)
		{
			var res = getResponse();

			var resultMessage = new { message = "" };

			var str = res.Content.ReadAsStringAsync().Result;

			resultMessage = JsonConvert.DeserializeAnonymousType(res.Content.ReadAsStringAsync().Result, resultMessage);

			if (!res.IsSuccessStatusCode)
			{
				bll.ResetUser();
				throw new UnauthorizedAccessException(resultMessage.message);
			}
			else
				proc(res);
		}
	}
}
