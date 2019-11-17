#include <SoftwareSerial.h>
int flag = 0;
int ledPin = 13;
SoftwareSerial BTserial(0,1);
void setup() {
  // put your setup code here, to run once:
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  if(Serial.available() > 0){
    char data = Serial.read();
    if(data == 'b'){
      Serial.println("b");
      if(flag == 0){
        digitalWrite(LED_BUILTIN,HIGH);
        
        flag = 1;
      }else{
        digitalWrite(LED_BUILTIN,LOW);
        flag = 0;
      }
    }
  }
  Serial.flush();
}
