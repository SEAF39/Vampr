class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      numberOfVampires++;
      currentVampire = currentVampire.creator;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let currentVampire = this;
    const ancestors = new Set();
    while (currentVampire) {
      ancestors.add(currentVampire);
      currentVampire = currentVampire.creator;
    }
    currentVampire = vampire;
    while (!ancestors.has(currentVampire)) {
      currentVampire = currentVampire.creator;
    }
    return currentVampire;
  }

  get totalDescendents() {
    let total = 0;
    for (let offspring of this.offspring) {
      total += 1 + offspring.totalDescendents;
    }
    return total;
  }

  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }
    for (let offspring of this.offspring) {
      let result = offspring.vampireWithName(name);
      if (result) {
        return result;
      }
    }
    return null;
  }

  get allMillennialVampires() {
    let result = [];
    if (this.yearConverted > 1980) {
      result.push(this);
    }
    for (let offspring of this.offspring) {
      result = result.concat(offspring.allMillennialVampires);
    }
    return result;
  }
}

module.exports = Vampire;
