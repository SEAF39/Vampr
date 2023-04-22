const chai = require('chai');
const expect = chai.expect;
const Vampire = require('../vampire.js');

describe("totalDescendents", () => {
  it("returns 0 if the vampire has no offspring", () => {
    const root = new Vampire("root", 1700);
    
    const result = root.totalDescendents;
    
    expect(result).toEqual(0);
  });
  
  it("returns the number of direct offspring if there are any", () => {
    const root = new Vampire("root", 1700);
    const offspring1 = new Vampire("offspring1", 1725);
    const offspring2 = new Vampire("offspring2", 1750);
    root.addOffspring(offspring1);
    root.addOffspring(offspring2);
    
    const result = root.totalDescendents;
    
    expect(result).toEqual(2);
  });
  
  it("returns the total number of descendants if there are multiple levels of offspring", () => {
    const root = new Vampire("root", 1700);
    const offspring1 = new Vampire("offspring1", 1725);
    const offspring2 = new Vampire("offspring2", 1750);
    const offspring3 = new Vampire("offspring3", 1775);
    root.addOffspring(offspring1);
    root.addOffspring(offspring2);
    offspring1.addOffspring(offspring3);
    
    const result = root.totalDescendents;
    
    expect(result).toEqual(3);
  });
});
