const xcolor = require('../xcolor');
const { expect, describe, it } = require('@jest/globals');

describe('xcolor', () => {
  it('creates instances', () => {
    //const c = new xcolor('red');
    //expect(c).not.toBeInstanceOf(xcolor);
    expect(new xcolor('red')).toThrowErrorMatchingSnapshot();
  });

  it('shows color in hex', () => {
    const c = new xcolor('#ff0000');
    expect(c.getHex()).toBe('#ff0000');
  });

  it('shows color in rgba', () => {
    const c = new xcolor('rgba(255,0,0,0.5)');
    expect(c.getRgba()).toBe('rgba(255,0,0,0.5)');
  });

  it('shows color in rgb', () => {
    const c = new xcolor('rgba(255,0,0,0.5)');
    expect(c.getRgb()).toBe('rgb(255,0,0)');
  });

  it('shows color in hex', () => {
    const c = new xcolor('#ff0000');
    expect(c.getHex()).toBe('#ff0000');
  });

  it('shows color in hexa', () => {
    const c = new xcolor('#ff000080');
    expect(c.getHexa()).toBe('#ff000080');
  });

  it('shows color in hsl', () => {
    const c = new xcolor('hsl(0,100%,50%)');
    expect(c.getHsl()).toBe('hsl(0,100%,50%)');
  });

  it('shows color in hsla', () => {
    const c = new xcolor('hsla(0,100%,50%,0.5)');
    expect(c.getHsla()).toBe('hsla(0,100%,50%,0.5)');
  });

  it('shows color in hsb', () => {
    const c = new xcolor('hsb(0,100%,50%)');
    expect(c.getHsb()).toBe('hsb(0,100%,50%)');
  });

  it('shows color in hsba', () => {
    const c = new xcolor('hsba(0,100%,50%,0.5)');
    expect(c.getHsba()).toBe('hsba(0,100%,50%,0.5)');
    console.log(c);
  });


  it('generates a random hexadecimal color', () => {
    const color = xcolor.randomColor('hex');
    expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it('generates a random rgb color', () => {
    const color = xcolor.randomColor('rgb');
    expect(color).toMatch(/^rgb\(\d+,\d+,\d+\)$/);
  });

  it('generates a random rgba color', () => {
    const color = xcolor.randomColor('rgba');
    expect(color).toMatch(/^rgba\(\d+,\d+,\d+,[\d.]+\)$/);
  });

  it('generates a random hsl color', () => {
    const color = xcolor.randomColor('hsl');
    expect(color).toMatch(/^hsl\(\d+,\d+%,\d+%\)$/);
  });

  it('generates a random hsla color', () => {
    const color = xcolor.randomColor('hsla');
    expect(color).toMatch(/^hsla\(\d+,\d+%,\d+%,[\d.]+\)$/);
  });


  it('generates a monochromaticPalette palette', () => {
    const color = new xcolor(xcolor.randomColor('hsl'));
    const palette = xcolor.monochromaticPalette(color);
    expect(palette.length).toBe(15);
  })

  it('generates a shades', () => {
    const color = xcolor.randomXcolor('hsl');
    const palette = xcolor.shades(color);
    expect(palette.length).toBe(15);
  })
});

