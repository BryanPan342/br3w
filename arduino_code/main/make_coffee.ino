/*
 * 1. Pour coffee grounds into the cup
 * 2. Heat up water
 * 3. Dispense hot water (open and close valve)
 */
void make_coffee()
{
  /* 1. Pour coffee grounds by turning servo */
  dispense_coffee(grams_grounds);
  
  /* 2. Heat up water */
  heat_water();

  /* Dispense water */
  dispense_water();

  
}
