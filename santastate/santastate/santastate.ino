#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
  #include <avr/power.h>
#endif

#define PIN 6
#define LED_COUNT 297

// Parameter 1 = number of pixels in strip
// Parameter 2 = Arduino pin number (most are valid)
// Parameter 3 = pixel type flags, add together as needed:
//   NEO_KHZ800  800 KHz bitstream (most NeoPixel products w/WS2812 LEDs)
//   NEO_KHZ400  400 KHz (classic 'v1' (not v2) FLORA pixels, WS2811 drivers)
//   NEO_GRB     Pixels are wired for GRB bitstream (most NeoPixel products)
//   NEO_RGB     Pixels are wired for RGB bitstream (v1 FLORA pixels, not v2)
//   NEO_RGBW    Pixels are wired for RGBW bitstream (NeoPixel RGBW products)
Adafruit_NeoPixel strip = Adafruit_NeoPixel(LED_COUNT, PIN, NEO_GRB + NEO_KHZ800);

// IMPORTANT: To reduce NeoPixel burnout risk, add 1000 uF capacitor across
// pixel power leads, add 300 - 500 Ohm resistor on first pixel's data input
// and minimize distance between Arduino and first pixel.  Avoid connecting
// on a live circuit...if you must, connect GND first.

int lednumber = 0;
uint32_t COLORMAP[5];

void setup() {
  strip.begin();
  strip.setBrightness(16);
  strip.show(); // Initialize all pixels to 'off'

  Serial.begin(115200);

  COLORMAP[0] = strip.Color(0,0,0);
  COLORMAP[1] = strip.Color(128,0,128);
  COLORMAP[2] = strip.Color(128,128,0);
  COLORMAP[3] = strip.Color(0,255,0);
  COLORMAP[4] = strip.Color(0,200,80);
}

uint32_t mapColor(int colorIndex) {
  return COLORMAP[colorIndex];
}

void loop() {
  // send data only when you receive data:
  if (Serial.available() > 0) {
    // read the incoming byte:
    int incomingByte = Serial.read();
    if (incomingByte == 'R') {
      lednumber = -1;
      strip.show();
    } else {
      strip.setPixelColor(LED_COUNT-1 - lednumber, mapColor(incomingByte - '0'));
    }
    lednumber = (lednumber + 1) % LED_COUNT;
  }
}

