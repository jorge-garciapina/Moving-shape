class BaseConverter {
  changeBase(numberToConvert, base = 0) {
    if (base === 0) {
      return this.toRoman(numberToConvert);
    } else if (base > 0) {
      return this.toAnotherBase(numberToConvert, base);
    }
  }
  toAnotherBase(numberToConvert, base = 10) {
    return numberToConvert.toString(base);
  }

  toRoman(numberToConvert) {
    if (numberToConvert === 0) {
      return "0";
    }
    const map = [
      [1000, "M"],
      [900, "CM"],
      [500, "D"],
      [400, "CD"],
      [100, "C"],
      [90, "XC"],
      [50, "L"],
      [40, "XL"],
      [10, "X"],
      [9, "IX"],
      [5, "V"],
      [4, "IV"],
      [1, "I"],
    ];
    let roman = "";

    for (let [value, romanSymbol] of map) {
      while (numberToConvert >= value) {
        roman += romanSymbol;
        numberToConvert -= value;
      }
    }

    return roman;
  }
}

const baseConverter = new BaseConverter();

export default baseConverter;
