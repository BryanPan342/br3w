void heat_water()
{
    Serial.println("h");
    delay(700);
  //read in current temp of water
    float temperature = getTemp();
    digitalWrite(heaterPin, HIGH);
    while (temperature < desired_temp + TEMP_BUFFER)
    {
      delay(700);
      Serial.println(temperature);
      temperature = getTemp();
    }
    digitalWrite(heaterPin, LOW);
}