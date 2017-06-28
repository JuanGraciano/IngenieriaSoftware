using System;
namespace BusinessLogicLayerPX
{
	public class BLLBuilder
	{
		public static IBusinessLogicLayerPX GetBLLClass()
		{
			//return BusinessLogicLayerPXTest.GetUniqueInstance();
			return BusinessLogicLayerPX.GetUniqueInstance();
		}
	}
}
