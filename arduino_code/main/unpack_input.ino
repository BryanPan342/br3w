//takes in a character which maps to certain settings. 
//This function calculates those settings
void set_parameters(char data)
{
  switch (tolower(data))
    {
      case 'a':
        desired_temp = 92;
        time_sol = TIME_8;
        grams_grounds = GRAMS_8;
        break;
      case 'b':
        desired_temp = 92;
        time_sol = TIME_10;
        grams_grounds = GRAMS_12;
        break;
      case 'c':
        desired_temp = 92;
        time_sol = TIME_12;
        grams_grounds = GRAMS_16;
        break;
      case 'd':
        desired_temp = 93;
        time_sol = TIME_8;
        grams_grounds = GRAMS_8;
        break;
      case 'e':
        desired_temp = 93;
        time_sol = TIME_10;
        grams_grounds = GRAMS_12;
        break;
      case 'f':
        desired_temp = 93;
        time_sol = TIME_12;
        grams_grounds = GRAMS_16;
        break;
      case 'g':
        desired_temp = 94;
        time_sol = TIME_8;
        grams_grounds = GRAMS_8;
        break;
      case 'h':
        desired_temp = 94;
        time_sol = TIME_10;
        grams_grounds = GRAMS_12;
        break;
      case 'i':
        desired_temp = 94;
        time_sol = TIME_12;
        grams_grounds = GRAMS_16;
        break;
      case 'j':
        desired_temp = 95;
        time_sol = TIME_8;
        grams_grounds = GRAMS_8;
        break;
      case 'k':
        desired_temp = 95;
        time_sol = TIME_10;
        grams_grounds = GRAMS_12;
        break;
      case 'l':
        desired_temp = 95;
        time_sol = TIME_12;
        grams_grounds = GRAMS_16;
        break;
      case 'm':
        desired_temp = 96;
        time_sol = TIME_8;
        grams_grounds = GRAMS_8;
        break;
      case 'n':
        desired_temp = 96;
        time_sol = TIME_10;
        grams_grounds = GRAMS_12;
        break;
      case 'o':
        desired_temp = 96;
        time_sol = TIME_12;
        grams_grounds = GRAMS_16;
        break;
    }
    if (isupper(data))
      grams_grounds +=4 ; //requested strong coffee
}
