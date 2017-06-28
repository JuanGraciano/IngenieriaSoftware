using System;
using Android.App;

namespace MainAppPX.Droid
{
	public abstract class BaseActivity: Activity
	{
		public BaseActivity()
		{
		}

		/// <summary>
		/// Method that will be executed every time the activity resumes its 
		/// execution.
		/// </summary>
		protected abstract void RefreshData();

		protected override void OnResume()
		{
			base.OnResume();

			Utility.AuthenticateIfNeeded(() =>
			{
				RefreshData();
			}, this);
		}
	}
}
