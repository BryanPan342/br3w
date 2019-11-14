int flag = 0;
int ledPin = 13;
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

}
