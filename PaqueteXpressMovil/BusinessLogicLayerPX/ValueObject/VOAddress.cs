using System;
using Newtonsoft.Json;

namespace BusinessLogicLayerPX
{
	public class VOAddress
	{
		public VOAddress()
		{
		}

		[JsonProperty("latitude")]
		public double Latitude
		{
			get;
			set;
		}

		[JsonProperty("longitude")]
		public double Longitude
		{
			get;
			set;
		}
	}
}
