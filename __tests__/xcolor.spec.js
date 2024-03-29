const xcolor = require('../xcolor');
const { expect, describe, it } = require('@jest/globals');

describe('xcolor', () => {
  it('crea instancias', () => {
    //const c = new xcolor('red');
    //expect(c).not.toBeInstanceOf(xcolor);
    expect(new xcolor('red')).toThrowErrorMatchingSnapshot();
  });

  it('muestra el color en hex', () => {
    const c = new xcolor('#ff0000');
    expect(c.getHex()).toBe('#ff0000');
  });

  it('comprueba igualdad de colores', () => {
    const c1 = new xcolor('red');
    const c2 = new xcolor('#ff0000');
    expect(c1).not.toBe(c2);
  });

  it('comprueba diferencia de colores', () => {
    const c1 = new xcolor('red');
    const c2 = new xcolor('blue');
    expect(c1).not.toBe(c2);
  });

  it('muestra el color en rgba', () => {
    const c = new xcolor('rgba(255,0,0,0.5)');
    expect(c.getRgba()).toBe('rgba(255,0,0,0.5)');
  });

  it('muestra el color en rgb', () => {
    const c = new xcolor('rgba(255,0,0,0.5)');
    expect(c.getRgb()).toBe('rgb(255,0,0)');
  });


  it('genera un color hexadecimal aleatorio', () => {
    const color = xcolor.randomColor('hex');
    expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it('genera un color rgb aleatorio', () => {
    const color = xcolor.randomColor('rgb');
    expect(color).toMatch(/^rgb\(\d+,\d+,\d+\)$/);
  });

  it('genera un color rgba aleatorio', () => {
    const color = xcolor.randomColor('rgba');
    expect(color).toMatch(/^rgba\(\d+,\d+,\d+,[\d.]+\)$/);
  });

  it('genera un color hsl aleatorio', () => {
    const color = xcolor.randomColor('hsl');
    expect(color).toMatch(/^hsl\(\d+,\d+%,\d+%\)$/);
  });

  it('genera un color hsla aleatorio', () => {
    const color = xcolor.randomColor('hsla');
    expect(color).toMatch(/^hsla\(\d+,\d+%,\d+%,[\d.]+\)$/);
  });


});
