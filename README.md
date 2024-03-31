# xcolor
**WARNING:** this library is at early development

The `xcolor.js` library provides a collection of JavaScript functions for working with colors in various formats. It offers methods for:

- Generating random colors
- Converting between color formats
- Performing color manipulations, such as:
    - Interpolating between colors
    - Darkening and lightening colors
    - Creating color palettes

**Installation**

To install xcolor.js, you can use a package manager like npm or yarn:

```bash
npm install github:ryddle/xcolor
```

**Class: xcolor**

The `xcolor` class provides methods to parse and convert between different color formats:

* RGB (red, green, blue)
* RGBA (red, green, blue, alpha)
* HEX (hexadecimal color code)
* HEXA (hexadecimal color code with alpha)
* HSL (hue, saturation, lightness)
* HSLA (hue, saturation, lightness, alpha)
* HSB (hue, saturation, brightness)
* HSBA (hue, saturation, brightness, alpha)

**Constructor**

```javascript
constructor(colorCode, alphaMode)
```

* `colorCode`: A string representing the color code in any of the supported formats.
* `alphaMode` (optional): A boolean value indicating whether to include the alpha channel in the conversion (**Not currently functional.** Defaults to `true`).

**Throws an error if the color code is invalid.**

**Getter Methods**

* `getRgba()`: Returns the color code in RGBA format.
* `getRgb()`: Returns the color code in RGB format.
* `getHexa()`: Returns the color code in HEXA format (including alpha).
* `getHex()`: Returns the color code in HEX format.
* `getHsba()`: Returns the color code in HSBA format.
* `getHsb()`: Returns the color code in HSB format.
* `getHsla()`: Returns the color code in HSLA format.
* `getHsl()`: Returns the color code in HSL format.

**Parsing Methods**

These methods are private and used internally by the class to parse different color formats from the provided color code.

* `parseRgb(colorCode)`
* `parseRgba(colorCode)`
* `parseHex(colorCode)`
* `parseHexa(colorCode)`
* `parseHsla(colorCode)`
* `parseHsl(colorCode)`
* `parseHsb(colorCode)`
* `parseHsba(colorCode)`

**Static Instance Methods**
* `getRgb([r, g, b])`: Get an xcolor instance from rgb array 
* `getRgba([r, g, b, a])`: Get an xcolor instance from rgba array 
* `getHsl([h, s, l])`: Get an xcolor instance from hsl array 
* `getHsla([h, s, l, a])`: Get an xcolor instance from hsla array 
* `getHsb([h, s, b])`: Get an xcolor instance from hsb array 
* `getHsba([h, s, b, a])`: Get an xcolor instance from hsba array 

**Static Conversion Methods**

These methods are used to convert between different color formats without creating an instance of the `xcolor` class.

* `rgb2rgba(color)`: Converts RGB to RGBA (adds alpha if not present).
* `rgba2rgb(color)`: Converts RGBA to RGB (removes alpha).
* `rgb2hex(color)`: Converts RGB to HEX.
* `rgba2hex(color)`: Converts RGBA to HEX (ignores alpha).
* `rgba2hexa(color)`: Converts RGBA to HEXA.
* `hex2rgba(color)`: Converts HEX to RGBA.
* `hex2rgb(color)`: Converts HEX to RGB.
* `hexa2rgba(color)`: Converts HEXA to RGBA.
* `hex2rgb(color)`: Converts HEXA to RGB (ignores alpha).
* `hex2hsb(color)`: Converts HEX to HSB.
* `hexa2hsba(color)`: Converts HEXA to HSBA.
* `hex2hsl(color)`: Converts HEX to HSL.
* `hexa2hsla(color)`: Converts HEXA to HSLA.
* `hsl2hsb(colorCode)`: Converts HSL to HSB.
* `hsla2hsba(colorCode)`: Converts HSLA to HSBA.
* `hsb2hsl(colorCode)`: Converts HSB to HSL.
* `hsba2hsla(colorCode)`: Converts HSBA to HSLA.
* `hsl2rgb(colorCode)`: Converts HSL to RGB.
* `hsla2rgba(colorCode)`: Converts HSLA to RGBA.
* `rgb2hsl(colorCode)`: Converts RGB to HSL.
* `rgba2hsla(colorCode)`: Converts RGBA to HSLA.

**Color Generation:**

- `randomColor(format = 'hex')`: Generates a random color in the specified format ('hex', 'rgb', 'rgba', 'hsb', 'hsba', 'hsl', 'hsla').

**Color Manipulation:**

- `lerpColor(xcolorA, xcolorB, intval)`: Linear interpolation between colors.
- `darken(xcolor, amount)`: Darkens a color.
- `lighten(xcolor, amount)`: Lightens a color.

**Color Palette Generation:**

- `analogousPalette(baseColor)`: Generates an analogous palette.
- `complementaryPalette(baseColor)`: Generates a complementary palette.
- `splitComplementaryPalette(baseColor)`: Generates a split complementary palette.
- `triadicPalette(baseColor)`: Generates a triadic palette.
- `tetradicPalette(baseColor)`: Generates a tetradic palette.
- `squarePalette(baseColor)`: Generates a square palette.
- `genMonochromaticPalette(baseColor)`: Generates a monochromatic palette.
- `shades(baseColor)`: Generates shades of a color.
- `tints(baseColor)`: Generates tints of a color.
- `tones(baseColor)`: Generates tones of a color.
