/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance heirarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properites and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * dimensions
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/

/*
  === CharacterStats ===
  * hp
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

/*
  === Humanoid ===
  * faction
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
 
/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

function GameObject (objAttributes) {
  this.createdAt = objAttributes.createdAt;
  this.dimensions = objAttributes.dimensions;
}

GameObject.prototype.destroy = function (){
  return `${this.name} was removed from the game.`;
}

function CharacterStats(charAttributes){
  GameObject.call(this, charAttributes);
  this.hp = charAttributes.hp;
  this.name = charAttributes.name;
}

CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function (){
  return `${this.name} took damage`;
};

function Humanoid(humanAttributes){
  CharacterStats.call(this, humanAttributes);
  this.faction = humanAttributes.faction;
  this.weapons = humanAttributes.weapons;
  this.language = humanAttributes.language;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function (){
  return `${this.name} offers a greeting in ${this.language}`;
}

// Test you work by uncommenting these 3 objects and the list of console logs below:


  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    hp: 5,
    name: 'Bruce',
    faction: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Toungue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    hp: 15,
    name: 'Sir Mustachio',
    faction: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Toungue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    hp: 10,
    name: 'Lilith',
    faction: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.hp); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.faction); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

  // Stretch task: 
  // * Create Villian and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villians different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villian and one a hero and fight it out with methods!

  function Villian(villianAttributes){
    Humanoid.call(this, villianAttributes);
    this.attack = villianAttributes.attack;
    this.type = villianAttributes.type;
  }

  function Hero(heroAttributes){
    Humanoid.call(this, heroAttributes);
    this.attack = heroAttributes.attack;
    this.type = heroAttributes.type;
  }

  Villian.prototype = Object.create(Humanoid.prototype);
  Hero.prototype = Object.create(Humanoid.prototype);

  Villian.prototype.destroy = function () {
    return `${this.name} is defeated, and the town is saved! \n You Win!`;
  }

  Hero.prototype.destroy = function () {
    return `You failed to save the town, ${this.name} has died. \n Game Over!`;
  }

  Humanoid.prototype.fight = function (hero) {
    if(hero.type === this.type) {
      return `${this.name} refuses to engage.`
    }
    while(hero.hp > 0 && this.hp > 0) {
      random = Math.random();
      if(random > .5){
        hero.hp = hero.hp - this.attack;
          if (hero.hp > 0){
            console.log(`${hero.name} takes ${this.attack} damage. Hero hp ${hero.hp}`)
          } else {
            return (hero.destroy());
          }
      }
      if(random < .5) {
        this.hp = this.hp - hero.attack;
        if (this.hp > 0){
          console.log(`${this.name} takes ${hero.attack} damage. Villian hp ${this.hp}`)
        } else {
          return (this.destroy());
        }
      }
    }
  }

const Meowth = new Villian({
  createdAt: new Date(),
  dimensions: {
    length: 10,
    width: 20,
    height: 40,
  },
  hp: 66,
  name: 'Meowth',
  faction: 'Team Rocket',
  weapons: [
    'Scratch',
    'Bite',
  ],
  language: 'English',
  attack: 8,
  type: "Villain",
});

const Pikachu = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 10,
  },
  hp: 50,
  name: 'Pickachu',
  faction: 'Pallet Town',
  weapons: [
    'Thunder',
    'Head Butt',
  ],
  language: 'Pika-Pika',
  attack: 10,
  type: "hero",
});

console.log(Meowth.fight(Pikachu));