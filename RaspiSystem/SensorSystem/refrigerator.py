import serial
import re
import sys
import cv2
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(18,GPIO.OUT)

#ser = serial.Serial('/dev/tty.usbmodem000591069165', timeout=0.1)
ser = serial.Serial('/dev/serial/by-id/usb-SEGGER_J-Link_000591069165-if00', timeout=0.1)
####################################################################
"""
TemperatureData = None
while True:
    ByteStr = ser.read(150)
    
    StrConvert = ByteStr.decode()
    
    arr = StrConvert.split('\r\n')

    flag = 0
    for i in range(len(arr)):
        jesture = 'Temperature' in arr[i]

        if jesture == True:
            TemperatureData = arr[i]
            break

    if TemperatureData != None:
        break
    
temperature = re.findall("[0-9]{2}", TemperatureData)
print(temperature)
"""

####################################################################
def PressureFunction():
    PressureData = None
    while True:
        ByteStr = ser.read(150)
        
        StrConvert = ByteStr.decode()
        
        arr = StrConvert.split('\r\n')
        
        flag = 0
        for i in range(len(arr)):
            jesture = 'Pressure' in arr[i]
            
            if jesture == True:
                PressureData  = arr[i]
                break
            
        if PressureData != None:
            pressure = re.findall("[0-9]{6}", PressureData)
            return pressure
####################################################################
def capture_camera(size=None):
    cap = cv2.VideoCapture(0)

    GPIO.output(18,GPIO.HIGH)
    time.sleep(10)
    
    while True:
        ret, frame = cap.read()

        if size is not None and len(size) == 2:
            frame = cv2.resize(frame, size)

        frame = cv2.flip(frame, 0)
        
        cv2.imwrite('frame.jpg', frame)

        break
            
    cap.release()
    GPIO.output(18,GPIO.LOW)

####################################################################
#main
firstTime = 0
beforeTime = 0
while True:
    pressValue = PressureFunction()
    if not pressValue:
        continue

    if firstTime == 0:
        firstTime = 1
        beforeTime = int(pressValue[0])
        continue
    else:
        print(beforeTime)
        if abs(int(pressValue[0])-beforeTime) >= 3:
            #take a picture
            #capture_camera(size = (100, 100))
            capture_camera()
            break
        
        beforeTime = int(pressValue[0])

####################################################################
