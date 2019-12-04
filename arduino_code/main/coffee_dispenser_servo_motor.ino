
void dispense_coffee(int grams) 
{
    Serial.println("Dispensing coffee");
    int rotations = grams/4;
    for(int i = 0; i < rotations; i++) {
    myservo.write(SERVO_START + SERVO_TURN);
    delay(3000);
    myservo.write(SERVO_START);
    delay(10000);
  }
}
