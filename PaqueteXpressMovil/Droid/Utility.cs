using System;
using System.IO;
using Android.App;
using Android.Graphics;
using Android.Widget;

namespace MainAppPX.Droid
{
	public class Utility
	{
		public Utility()
		{
		}

		public delegate void UiProcedure();

		/// <summary>
		/// Execute authentication activity if the user is not authenticated and 
		/// the procedure method need it.
		/// </summary>
		/// <param name="procedure">Procedure to execute.</param>
		/// <param name="activity">Original Activity.</param>
		public static void AuthenticateIfNeeded(UiProcedure procedure, Activity activity)
		{
			try
			{
				procedure();
			}
			catch (UnauthorizedAccessException)
			{
				activity.StartActivity(typeof(AuthenticationActivity));
			}
		}

		public static byte[] ImageViewToByteArray(ImageView image)
		{
			image.Measure(Android.Views.View.MeasureSpec.MakeMeasureSpec(
				0, Android.Views.MeasureSpecMode.Unspecified),
						  Android.Views.View.MeasureSpec.MakeMeasureSpec(0, Android.Views.MeasureSpecMode.Unspecified));
			image.Layout(0, 0, image.MeasuredWidth, image.MeasuredHeight);

			image.BuildDrawingCache(true);

			var bitmap = image.GetDrawingCache(true);

			byte[] bitmapData;
			using (var stream = new MemoryStream())
			{
				bitmap.Compress(Bitmap.CompressFormat.Png, 0, stream);
				bitmapData = stream.ToArray();
			}

			return bitmapData;
		}
	}
}
