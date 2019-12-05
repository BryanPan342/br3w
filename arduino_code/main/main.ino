#include <SoftwareSerial.h>
#include <OneWire.h>
#include <Servo.h>
#include <ctype.h>
//#include "temp_code.cpp"

//these variables will be set when the data from the app comes in
int desired_temp = -1; //desired temperature for coffee
int grams_grounds = -1; //number of turns for servo
int time_sol = -1; //how long the solenoid valve should be open for water

/* Constants */
//flow rate data for time_sol calculation
const float SEC_OZ = 5.533; //number of seconds it takes for 1 ounce of water to flow
//amount of time to open solenoid valve
const float TIME_8 = 8*SEC_OZ; 
const float TIME_10 = 10*SEC_OZ;
const float TIME_12 = 12*SEC_OZ;
//number of turns for servo
const int GRAMS_8 = 8;
const int GRAMS_12 = 12;
const int GRAMS_16 = 16;
//constants for servo position
const int SERVO_START = 340;
const int SERVO_TURN = -340;
// Heating water constants
const int TEMP_BUFFER = -1; //actually heat until temperature is desired_temp + buffer

/* PORTS */
/* Temp sensor and heater ports */
// DS18S20 Signal pin on digital 2
int DS18S20_Pin = 12;
char tmpstring[10];
// Temperature chip i/o
OneWire ds(DS18S20_Pin);
// on digital pin 2
SoftwareSerial display(3, 2);
int heaterPin = 13;

/* Coffee dispenser/servo ports */
Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards
//int pos = 0;    // variable to store the servo position
int servoPin = 8;

/*Solenoid valve ports */
int solenoidPin = 10;



void setup() {
  // heater setup
  pinMode(heaterPin, OUTPUT);
  Serial.begin(9600);

  //coffee dispenser setup
  myservo.attach(servoPin);  // attaches the servo on pin 9 to the servo object
  myservo.write(SERVO_START);
  
}

void loop() {
  if(Serial.available() > 0){
    //set desired parameters for temp, time for solenoid valve, and # turns for coffee grounds
    char data = Serial.read();
    //char data = 'a';
    set_parameters(data);
    //dispense_water();
    Serial.println("Making coffee");
    make_coffee();

    Serial.println("d"); //for done

   }
}
  
