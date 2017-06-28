
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
	[Activity(Label = "OrderActivity")]
	public class OrderActivity : BaseActivity
	{
		IBusinessLogicLayerPX bll = null;

		string orderId = null;

		protected override void OnCreate(Bundle savedInstanceState)
		{
			base.OnCreate(savedInstanceState);

			// Set our view from the "order" layout resource
			SetContentView(Resource.Layout.OrderLayout);

			// Create your application here
			bll = BLLBuilder.GetBLLClass();

			orderId = Intent.GetStringExtra("OrderId");

			if (orderId == null)
				this.Finish();

			// Create your application here
			bll = BLLBuilder.GetBLLClass();

		}

		/// <summary>
		/// Creates a horizontal lineal layout with 2 text views.
		/// each text view takes the same space.
		/// </summary>
		/// <returns>The horizontal layout with 2 text views.</returns>
		/// <param name="text1">Text1.</param>
		/// <param name="text2">Text2.</param>
		protected LinearLayout CreateHorizontalWith2Text(string text1, string text2)
		{
			LinearLayout row = new LinearLayout(this);
			row.Orientation = Orientation.Horizontal;

			TextView tvText1 = new TextView(this);
			TextView tvText2 = new TextView(this);

			tvText1.Text = text1;
			tvText1.LayoutParameters = new TableLayout.LayoutParams(
				ViewGroup.LayoutParams.WrapContent,
				ViewGroup.LayoutParams.WrapContent,
				1f);

			tvText2.Text = text2;
			tvText2.LayoutParameters = new TableLayout.LayoutParams(
				ViewGroup.LayoutParams.WrapContent,
				ViewGroup.LayoutParams.WrapContent,
				1f);

			row.AddView(tvText1);
			row.AddView(tvText2);

			return row;
		}

		protected override void RefreshData()
		{

			VOOrder order = bll.GetOrder(orderId);

			if (order == null)
				Finish();

			EditText etId = FindViewById<EditText>(Resource.Id.etId);

			EditText etStatus = FindViewById<EditText>(Resource.Id.etStatus);

			LinearLayout Products = FindViewById<LinearLayout>(Resource.Id.Products);

			etId.Text = order.Id;

			etStatus.Text = order.Status;

			Products.RemoveAllViews();

			Products.AddView(CreateHorizontalWith2Text("Id", "Quantity"));

			foreach (var product in order.ProductList)
			{
				Products.AddView(CreateHorizontalWith2Text(product.Key, product.Value.ToString()));
			}

		}
	}
}
