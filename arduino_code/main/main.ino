#include <SoftwareSerial.h>
#include <OneWire.h>
#include <Servo.h>
#include <ctype.h>
//#include "temp_code.cpp"

//these variables will be set when the data from the app comes in
int desired_temp = -1; //desired temperature for coffee
int servo_turns = -1; //number of turns for servo
int time_sol = -1; //how long the solenoid valve should be open for water

/* Constants */
//flow rate data for time_sol calculation
const int SEC_OZ = 5.533; //number of seconds it takes for 1 ounce of water to flow
//amount of time to open solenoid valve
const int TIME_8 = 8*SEC_OZ; 
const int TIME_10 = 10*SEC_OZ;
const int TIME_12 = 12*SEC_OZ;
//number of turns for servo
const int SERVO_3 = 3;
const int SERVO_4 = 4;
const int SERVO_5 = 5;

/* Temp Sensor Ports */
// DS18S20 Signal pin on digital 2
int DS18S20_Pin = 8;
char tmpstring[10];
// Temperature chip i/o
OneWire ds(DS18S20_Pin);
// on digital pin 2
SoftwareSerial display(3, 2);
int heaterPin = 5;

/* Coffee dispenser variables */
Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards

int pos = 0;    // variable to store the servo position
int start = 160;
int turn = 500;

void setup() {
  // heater setup
  pinMode(heaterPin, OUTPUT);
  Serial.begin(9600);

  //coffee dispenser setup
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
  myservo.write(start);
  
}

void loop() {
  if(Serial.available() > 0){
    //set desired parameters for temp, time for solenoid valve, and # turns for coffee grounds
    char data = Serial.read();
    set_parameters(data);

    //read in current temp of water
    float temperature = getTemp();
    Serial.println(temperature);
    //If water is too cold, turn on heater, otherwise turn it off
    if (temperature <  desired_temp)
      digitalWrite(heaterPin, HIGH);
    else
      digitalWrite(heaterPin, LOW);
    
    // Just to slow down the output so it is easier to read
    delay(200);
  
    /* Janice put your code here */

    /* Isha put your code here*/
   }
}
  
