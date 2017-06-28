using Android.App;
using Android.Widget;
using Android.OS;
using BusinessLogicLayerPX;
using System;

namespace MainAppPX.Droid
{
	[Activity(Label = "PaqueteXpressMovil", MainLauncher = true, Icon = "@mipmap/icon")]
	public class MainActivity : BaseActivity
	{
		//int count = 1;

		IBusinessLogicLayerPX logicConnection = null;

		string statusAvailable = "Available";
		string statusUnavailable = "Unavailable";

		protected override void OnCreate(Bundle savedInstanceState)
		{
			base.OnCreate(savedInstanceState);

			// Set our view from the "main" layout resource
			SetContentView(Resource.Layout.Main);

			// Get our button from the layout resource,
			// and attach an event to it
			//Button button = FindViewById<Button>(Resource.Id.myButton);
            
            //button.Click += delegate { button.Text = string.Format("{0} clicks!", count++); };

			logicConnection = BLLBuilder.GetBLLClass();
        }

		/// <summary>
		/// Refresh the data of the main activity.
		/// </summary>
		protected override void RefreshData()
		{
			VOUser user = logicConnection.GetUser();
			ToggleButton active = FindViewById<ToggleButton>(Resource.Id.toggleButton1);
			Button listOrders = FindViewById<Button>(Resource.Id.button1);
			Button newOrder = FindViewById<Button>(Resource.Id.button2);

			active.Checked = user.Status == statusAvailable;

			if (user.Role == "Delivery")
			{
				newOrder.Visibility = Android.Views.ViewStates.Invisible;
			}

			active.Click += (sender, e) => Utility.AuthenticateIfNeeded(() =>
				{
					if (active.Checked)
					{
						logicConnection.ChangeStatus(statusAvailable);
					}
					else
					{
						logicConnection.ChangeStatus(statusUnavailable);
					}
					RefreshData();
				}, this);

			listOrders.Click += delegate
			{
				Utility.AuthenticateIfNeeded(() =>
				{
					StartActivity(typeof(OrderListActivity));
				}, this);
			};

			newOrder.Click += delegate
			{
				Utility.AuthenticateIfNeeded(() =>
				{
					//StartActivity(typeof());
				}, this);
			};
		}
	}
}
