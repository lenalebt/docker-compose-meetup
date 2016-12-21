import time
import serial
import urllib, json
try:
    from urllib.request import Request, urlopen  # Python 3
except:
    from urllib2 import Request, urlopen  # Python 2
    from urllib2 import *

ser = serial.Serial(
    port='/dev/ttyUSB0',
    baudrate=115200,
    parity=serial.PARITY_ODD,
    stopbits=serial.STOPBITS_ONE,
    bytesize=serial.EIGHTBITS
)
if ser.isOpen():
    ser.close()
ser.open()
ser.isOpen()

time.sleep(2)

request = Request("http://localhost/parcels")
request.add_header("Host", "parcel-service")

LED_COUNT=290
map_state = {
    "accepted": "1",
    "in_delivery": "2",
    "delivered": "3"
}
led_register = {}

try:
    while (True):
        try:
            response = urlopen(request)
            data = json.loads(response.read())
            print data
                
            state_map = {value["id"]: map_state[value["state"]] for value in data}
            
            new_register = {}
            for state_map_id, state in state_map.iteritems():
                for led_number, register_map_id in led_register.iteritems():
                    if (register_map_id == state_map_id):
                        new_register[led_number] = register_map_id
            for state_map_id, state in state_map.iteritems():
                if state_map_id not in new_register.values():
                    for number in range(LED_COUNT):
                        if number not in new_register:
                            new_register[number] = state_map_id
                            break;
            led_register = new_register
            
            arduino_str = "".join([state_map.get(led_register.get(number, "-"), "0") for number in range(LED_COUNT)]) + "R"
            
            ser.write(arduino_str.encode())
            out = ''
        except (URLError, HTTPError, httplib.BadStatusLine):
            pass
        # let's wait one second before reading output (let's give device time to answer)
        time.sleep(0.1)
except RuntimeError as err:
    print err
    ser.close()
ser.close()
