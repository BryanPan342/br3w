void heat_water()
{
    Serial.println("Heating water");
  //read in current temp of water
    float temperature = getTemp();
    digitalWrite(heaterPin, HIGH);
    while (temperature < desired_temp + TEMP_BUFFER)
    {
      Serial.println(temperature);
      temperature = getTemp();
    }
    digitalWrite(heaterPin, LOW);
}
