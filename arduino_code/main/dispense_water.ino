void dispense_water()
{
  Serial.println("Dispensing water");
  digitalWrite(solenoidPin, HIGH); // Open solenoid valve
  delay(time_sol*1000);
  digitalWrite(solenoidPin, LOW);
  Serial.println("Finished dispensing");
}

/*
int solenoidPin;
double flowrate;
int volume;
double time = volume/flowRate
double currentTemp;
double desiredTemp;
double startTime;
void setup() {
  // put your setup code here, to run once:
  pinMode(solenoidPin, OUTPUT);
  boolean run = true;
void loop() {
  // put your main code here, to run repeatedly:
  //Code to read temp:
  if(run) {
    if (currentTemp >= desiredTemp)
    {
    digitalWrite(solenoidPin, HIGH);
    startTime = millis();
    while (millis() - startTime <= time*1000)
    {}
      digitalWrite(solenoidPin, LOW);
    run = false;
    }
  }
 }
}*/
