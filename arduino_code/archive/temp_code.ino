
/*#include <SoftwareSerial.h>
#include <OneWire.h>
SoftwareSerial BTserial(1,0) //RX|TX
int flag = 0;
int ledPin = 13;
// DS18S20 Signal pin on digital 2
int DS18S20_Pin = 8;
char tmpstring[10];
// Temperature chip i/o
OneWire ds(DS18S20_Pin);
// on digital pin 2
SoftwareSerial display(3, 2);
void setup() {
  // put your setup code here, to run once:
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}
void loop() {
  // put your main code here, to run repeatedly:
  if(Serial.available() > 0){
    Serial.println(Serial.available());
    char data = Serial.read();
    //Serial.println(data);
    if(data == 'T'){
      if(flag == 0){
        digitalWrite(LED_BUILTIN,HIGH);
        flag = 1;
      }else{
        digitalWrite(LED_BUILTIN,LOW);
        flag = 0;
      }
    }
  }
  float temperature = getTemp();
  Serial.println(temperature);
  // Just to slow down the output so it is easier to read
  delay(200);
  }
float getTemp(){
  //returns the temperature from one DS18S20 in DEG Celsius
  byte data[12];
  byte addr[8];
  if ( !ds.search(addr)) {
      //no more sensors on chain, reset search
      ds.reset_search();
      Serial.print("bad chain");
      return -1000;
  }
  if ( OneWire::crc8( addr, 7) != addr[7]) {
      Serial.println("CRC is not valid!");
      return -1000;
  }
  if ( addr[0] != 0x10 && addr[0] != 0x28) {
      Serial.print("Device is not recognized");
      return -1000;
  }
  ds.reset();
  ds.select(addr);
  ds.write(0x44,1); // start conversion, with parasite power on at the end
  byte present = ds.reset();
  ds.select(addr);
  ds.write(0xBE); // Read Scratchpad
  for (int i = 0; i < 9; i++) { // we need 9 bytes
    data[i] = ds.read();
  }
  ds.reset_search();
  byte MSB = data[1];
  byte LSB = data[0];
  float tempRead = ((MSB << 8) | LSB); //using two's compliment
  float TemperatureSum = tempRead / 16;
  return TemperatureSum;
}*/
