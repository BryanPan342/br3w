//#include <Servo.h>
/*
Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards

int pos = 0;    // variable to store the servo position
int start = 160;
int turn = 500;

void setup() {
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
  myservo.write(start);
}


void loop() { 
  
  myservo.write(start + turn);
  delay(3000);
  myservo.write(start);
  delay(10000); 
} 
*/
void dispense(int grams) {
  int rotations = grams/4;
   for(int i = 0; i < rotations; i++) {
    myservo.write(start + turn);
    delay(3000);
    myservo.write(start);
    delay(10000);
  }
}
