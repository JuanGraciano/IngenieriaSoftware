using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BusinessLogicLayerPX
{
	public class VOOrder
	{
		[JsonProperty("id")]
		public string Id
		{
			get;
			set;
		}

		[JsonProperty("idSeller")]
		public string IdSeller
		{
			get;
			set;
		}

		[JsonProperty("idDelivery")]
		public string IdDelivery
		{
			get;
			set;
		}

		[JsonProperty("idClient")]
		public string IdClient
		{
			get;
			set;
		}

		[JsonProperty("clientName")]
		public string ClientName
		{
			get;
			set;
		}

		[JsonProperty("productList")]
		public Dictionary<string,int> ProductList
		{
			get;
			set;
		}

		[JsonProperty("address")]
		public VOAddress Address
		{
			get;
			set;
		}

		[JsonProperty("date")]
		public DateTime Date
		{
			get;
			set;
		}

		[JsonProperty("status")]
		public string Status
		{
			get;
			set;
		}

		public VOOrder()
		{
		}
	}
}
