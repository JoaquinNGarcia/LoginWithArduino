#include <ArduinoJson.h>

int analogPin_temperatura = A2, analogPin_humedad = A3, analogPin_viento = A4;
int val_temperatura = 0, val_humedad = 0, val_viento = 0;
int temp=0;
String inputString = "";    
boolean stringComplete = false;

int pinon = 3;
int pinoff = 0; 
int ledPin =  9; 
int estaon=HIGH;
int estaoff=HIGH;

void setup() {
  // put your setup code here, to run once:
  Serial.begin (9600);  
   
  // initialize the pushbutton pin as an input:
  pinMode(pinon, INPUT);
  pinMode(pinoff, INPUT);
   // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
}

int data[3];
void loop() {
  /*estaon = digitalRead(pinon);
  estaoff=digitalRead(pinoff);
  // check if the pushbutton is pressed. If it is, the buttonState is HIGH:
  if (estaon == LOW) {
    // turn LED on:
    digitalWrite(ledPin, HIGH);
    Serial.println("estaon low");
  }
  else{
    if (estaon=HIGH){
      Serial.println("estaon high");
        digitalWrite(ledPin, LOW);
    }
  }
  if(estaoff = LOW){
    //digitalWrite(ledPin, HIGH);
    Serial.println("estaoff low");
  }
  else{
    Serial.println("estaoff ");
  }
  */
  // put your main code here, to run repeatedly:
   data[0] = analogRead(analogPin_temperatura);
  data[1] =analogRead(analogPin_humedad);
  data[2] =  analogRead(analogPin_viento);
  
  //StaticJsonBuffer<200> jsonBuffer;
  String json;
  StaticJsonDocument<300> root;
  
  //JsonObject& root = jsonBuffer.createObject();

  root["Temperatura"] = data[0];
  root["Humedad"] = data[1];
  root["Viento"] = data[2];
  delay(1000);

  
  //Serial.println();
  //root.prettyPrintTo(Serial);
    serializeJson(root, json);
    Serial.println(json);

     if (stringComplete) {
      decodificar_comandos();
      inputString = "";
      stringComplete = false;
    }
}

void serialEvent() { 
  //cuando llega algo por el puerto serie
  while (Serial.available()) {
    char inChar = (char)Serial.read(); 
    inputString += inChar;
    if (inChar == '\n') {
      stringComplete = true;
    } 
   }
}        

void decodificar_comandos()
{
  int pinUsar,estado;
  char DO[0];
  //RECIBE LED91 PARA ENCENDER, LED90 PARA APAGAR el led 9 o LED61 LED60 para el led 6
  if(inputString.substring(0,3)=="LED"){
    DO[0]=inputString.charAt(3);
    pinUsar=atoi(DO);
    pinMode(pinUsar,OUTPUT);
    DO[0]=inputString.charAt(4);
    estado=atoi(DO);
    digitalWrite(pinUsar,estado);    
  }

}
