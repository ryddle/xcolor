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

  it('checks color equality', () => {
    const c1 = new xcolor('red');
    const c2 = new xcolor('#ff0000');
    expect(c1).not.toBe(c2);
  });

  it('checks color difference', () => {
    const c1 = new xcolor('red');
    const c2 = new xcolor('blue');
    expect(c1).not.toBe(c2);
  });

  it('shows color in rgba', () => {
    const c = new xcolor('rgba(255,0,0,0.5)');
    expect(c.getRgba()).toBe('rgba(255,0,0,0.5)');
  });

  it('shows color in rgb', () => {
    const c = new xcolor('rgba(255,0,0,0.5)');
    expect(c.getRgb()).toBe('rgb(255,0,0)');
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


});

