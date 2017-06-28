using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using BusinessLogicLayerPX;

namespace MainAppPX.Droid
{
	[Activity(Label = "OrderListActivity")]
	public class OrderListActivity : BaseActivity
	{
		IBusinessLogicLayerPX bll = null;

		protected override void OnCreate(Bundle savedInstanceState)
		{
			base.OnCreate(savedInstanceState);

			// Create your application here
			SetContentView(Resource.Layout.OrderList);

			bll = BLLBuilder.GetBLLClass();

		}

		protected override void RefreshData()
		{
			LinearLayout OrderListLayout = FindViewById<LinearLayout>(Resource.Id.OrderList);

			OrderListLayout.RemoveAllViews();

			VOUser user;

			foreach (var order in bll.GetSellerOrders())
			{
				TextView tvText1 = new TextView(this) { Text = order.Id };

				tvText1.SetTextSize(Android.Util.ComplexUnitType.Dip, 40f);

				tvText1.Click += (sender, e) => Utility.AuthenticateIfNeeded(() =>
					{
						user = bll.GetUser();

						if (user.Role == "Seller")
						{
							var activity2 = new Intent(this, typeof(OrderActivity));
							activity2.PutExtra("OrderId", order.Id);
							StartActivity(activity2);
						}
						else if (user.Role == "Delivery")
						{
						var geoUri = Android.Net.Uri.Parse(String.Format("geo:0,0?q={0},{1}({2})", 
						                                                 order.Address.Latitude, 
						                                                 order.Address.Longitude, order.Id));
							var mapIntent = new Intent(Intent.ActionView, geoUri);
							StartActivity(mapIntent);

						}
						else
							Finish();

					}, this);

				OrderListLayout.AddView(tvText1);
			}
		}
	}
}
