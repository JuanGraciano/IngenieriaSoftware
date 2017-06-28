using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;

namespace DataAcessLayerPX
{
	public class Utility
	{
		public Utility()
		{
		}

		public delegate HttpResponseMessage Procedure();

		/// <summary>
		/// Attach parameters to path
		/// </summary>
		/// <returns>Concrete path with parameters.</returns>
		/// <param name="path">Path.</param>
		/// <param name="parameters">Parameters.</param>
		public static string JoinParameter2Path(string path, Dictionary<string, string> parameters)
		{
			List<string> paramStr = new List<string>();
			            
			foreach (var key in parameters)
			{
				paramStr.Add(String.Format("{0}={1}", key.Key, key.Value));
			}

			return path + "?" + String.Join("&", paramStr);
		}

		/// <summary>
		/// Handles the request.
		/// </summary>
		/// <returns>The message.</returns>
		/// <param name="proc">Procedure to execute (make request).</param>
		/// <exception cref="WebException">If connection fails</exception>
		public static HttpResponseMessage HandleRequest(Procedure proc)
		{
			try
			{
				return proc();
			}
			catch (Exception ex)
			{
				if (ex.InnerException.GetType() == typeof(WebException))
					throw new WebException();
				else
					throw ex;
			}
		}
	}
}
