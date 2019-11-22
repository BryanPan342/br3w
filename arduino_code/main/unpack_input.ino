//takes in a character which maps to certain settings. 
//This function calculates those settings
void set_parameters(char data)
{
  switch (tolower(data))
    {
      case 'a':
        desired_temp = 92;
        time_sol = TIME_8;
        servo_turns = SERVO_3;
        break;
      case 'b':
        desired_temp = 92;
        time_sol = TIME_10;
        servo_turns = SERVO_4;
        break;
      case 'c':
        desired_temp = 92;
        time_sol = TIME_12;
        servo_turns = SERVO_5;
        break;
      case 'd':
        desired_temp = 93;
        time_sol = TIME_8;
        servo_turns = SERVO_3;
        break;
      case 'e':
        desired_temp = 93;
        time_sol = TIME_10;
        servo_turns = SERVO_4;
        break;
      case 'f':
        desired_temp = 93;
        time_sol = TIME_12;
        servo_turns = SERVO_5;
        break;
      case 'g':
        desired_temp = 94;
        time_sol = TIME_8;
        servo_turns = SERVO_3;
        break;
      case 'h':
        desired_temp = 94;
        time_sol = TIME_10;
        servo_turns = SERVO_4;
        break;
      case 'i':
        desired_temp = 94;
        time_sol = TIME_12;
        servo_turns = SERVO_5;
        break;
      case 'j':
        desired_temp = 95;
        time_sol = TIME_8;
        servo_turns = SERVO_3;
        break;
      case 'k':
        desired_temp = 95;
        time_sol = TIME_10;
        servo_turns = SERVO_4;
        break;
      case 'l':
        desired_temp = 95;
        time_sol = TIME_12;
        servo_turns = SERVO_5;
        break;
      case 'm':
        desired_temp = 96;
        time_sol = TIME_8;
        servo_turns = SERVO_3;
        break;
      case 'n':
        desired_temp = 96;
        time_sol = TIME_10;
        servo_turns = SERVO_4;
        break;
      case 'o':
        desired_temp = 96;
        time_sol = TIME_12;
        servo_turns = SERVO_5;
        break;
    }
    if (isupper(data))
      servo_turns ++; //requested strong coffee
}
