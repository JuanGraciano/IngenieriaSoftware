using NUnit.Framework;
using System;

namespace BusinessLogicLayerPX.Test
{
	[TestFixture()]
	public class Test
	{
		readonly IBusinessLogicLayerPX bll = BusinessLogicLayerPX.GetUniqueInstance();
		string statusAvailable = "Available";
		string statusUnavailable = "Unavailable";

		[Test()]
		public void TestCase()
		{
			try
			{
				var user = bll.GetUser();

				if (String.IsNullOrEmpty(user.Token))
					Assert.Fail();
				else
					Assert.Pass("the user is logged");
			}
			catch (UnauthorizedAccessException)
			{
				Assert.Pass("UnauthorizedAccessException");
			}
			catch (System.Net.WebException)
			{
				Assert.Inconclusive("WebException");
			}
		}

		[Test()]
		public void TestCaseAuthenticate()
		{
			try
			{
				bll.AuthenticateUser("aklelmejor", "12345");
				TestCase();
			}
			catch (UnauthorizedAccessException)
			{
				Assert.Inconclusive("UnauthorizedAccessException");
			}
			catch (System.Net.WebException)
			{
				Assert.Inconclusive("WebException");
			}
		}

		public VOUser GetUserOrFail()
		{
			var user = bll.GetUser();
			if (user == null)
				Assert.Fail("Not user.");
			return user;
		}

		public void TryChangeStatus(string newStatus)
		{
			var user = GetUserOrFail();
			var originalStatus = user.Status;

			if (originalStatus != newStatus && bll.ChangeStatus(statusAvailable))
			{
				if (GetUserOrFail().Status != statusAvailable)
					Assert.Fail("Failed to change to " + statusAvailable);
				else
					Assert.Pass();
			}
			else
			{
				if (GetUserOrFail().Status != originalStatus)
					Assert.Fail("It change the status although it shouldn't");
				else
					Assert.Pass();
			}
		}

		[Test()]
		public void TestChangeStatus()
		{
			var autenticated = false;

			try
			{
				autenticated = bll.AuthenticateUser("aklelmejor", "12345");


			}
			catch (System.Net.WebException)
			{
				Assert.Inconclusive("WebException");
			}

			if (autenticated)
			{
				try
				{
					if (GetUserOrFail().Status == statusAvailable)
						TryChangeStatus(statusUnavailable);
					else
						TryChangeStatus(statusAvailable);
				}
				catch (Exception ex)
				{
					Assert.Fail("Exception = " + ex.StackTrace);
				}
			}
			else
				Assert.Inconclusive("aklelmejor doesn't exits");
		}
	}
}
