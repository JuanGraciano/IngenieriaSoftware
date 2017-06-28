using System;
using Newtonsoft.Json;

namespace BusinessLogicLayerPX
{
	public class VOProduct
	{
		
		public VOProduct()
		{
		}

		[JsonProperty("productId")]
		public string ProductId
		{
			get;
			set;
		}

		[JsonProperty("descripcion")]
		public string Description
		{
			get;
			set;
		}

		[JsonProperty("price")]
		public decimal Price
		{
			get;
			set;
		}

		[JsonProperty("volume")]
		public float Volume
		{
			get;
			set;
		}
	}
}
