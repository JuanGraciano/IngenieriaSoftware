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
    [Activity(Label = "AuthenticationActivity")]
    public class AuthenticationActivity : Activity
    {
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);

            // Create your application here

            // Set our view from the "Authentication" layout resource
            SetContentView(Resource.Layout.Authenticationlayout);
            
            var logicConnection = BLLBuilder.GetBLLClass();

            Button login = FindViewById<Button>(Resource.Id.button1);

            EditText userID = FindViewById<EditText>(Resource.Id.editText1);

            EditText pass = FindViewById<EditText>(Resource.Id.editText2);

            login.Click += delegate {
                try
                {
                    logicConnection.AuthenticateUser(userID.Text, pass.Text);
                    this.Finish();
                }
                catch (System.Net.WebException)
                {
                    new AlertDialog.Builder(this).SetPositiveButton("Entendido", (sender, args) => { }).
                    SetMessage("En estos momentos el servidor no responde.").SetTitle("Algo salio mal.").Show();
                    /*
                    new AlertDialog.Builder(this).SetPositiveButton("Yes", (sender, args) =>
                    {
                        // User pressed yes
                    }
                    ).SetNegativeButton("No", (sender, args) =>
                    {
                        // User pressed no
                    }).SetMessage("En estos momentos el servidor no responde.").SetTitle("Algo salio mal.").Show();
                    */
                }
            };

        }
    }
}