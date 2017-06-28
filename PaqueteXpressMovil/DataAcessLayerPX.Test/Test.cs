using NUnit.Framework;
using System;
using System.Net;

namespace DataAcessLayerPX.Test
{
	[TestFixture()]
	public class Test
	{
		IDataAcessLayerPX dal = DataAcessLayerPX.GetUniqueInstance();

		[Test()]
		public void TestCase()
		{
			Assert.Inconclusive();
			try
			{
				var result = dal.GetUser("token");
				Assert.IsNotNull(result);
			}
			catch (Exception ex)
			{
				if (ex.InnerException.GetType() == typeof(WebException)
				   && ((WebException)ex.InnerException).Status.ToString() == "ConnectFailure")
					Assert.Fail();
			}
		}

		[Test()]
		public void testAuth()
		{
			try
			{
				var result = dal.AuthenticateUser("dfsafd", "13432432");
				Assert.IsNotNull(result);
			}
			catch (Exception ex)
			{
				if (ex.InnerException.GetType() == typeof(WebException)
				   && ((WebException)ex.InnerException).Status.ToString() == "ConnectFailure")
					Assert.Fail();
			}

		}
	}
}
