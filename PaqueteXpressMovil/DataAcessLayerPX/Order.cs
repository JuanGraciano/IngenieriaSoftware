using System;
using System.Collections.Generic;

namespace DataAcessLayerPX
{
	public class Order
	{
		public string Id
		{
			get;
			set;
		}

		public string IdUser
		{
			get;
			set;
		}

		public string IdClient
		{
			get;
			set;
		}

		public Dictionary<string, int> ProductList
		{
			get;
			set;
		}

		public double Latitude
		{
			get;
			set;
		}

		public double Longitude
		{
			get;
			set;
		}

		public DateTime Date
		{
			get;
			set;
		}

		public string Status
		{
			get;
			set;
		}
	}
}
