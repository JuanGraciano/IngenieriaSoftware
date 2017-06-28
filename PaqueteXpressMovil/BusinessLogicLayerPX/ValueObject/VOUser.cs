using System;
using Newtonsoft.Json;

namespace BusinessLogicLayerPX
{
	public class VOUser
	{
		[JsonProperty("token")]
		public String Token
		{
			get;
			set;
		}

		[JsonProperty("id")]
		public String Id
		{
			get;
			set;
		}

		[JsonProperty("status")]
		public String Status
		{
			get;
			set;
		}

		[JsonProperty("role")]
		public String Role
		{
			get;
			set;
		}

		public VOUser()
		{
		}
	}
}
