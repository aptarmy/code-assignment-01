'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Categories', [
      { CategoryID: 1, CategoryTitle: "education" },
      { CategoryID: 2, CategoryTitle: "recreational" },
      { CategoryID: 3, CategoryTitle: "social" },
      { CategoryID: 4, CategoryTitle: "diy" },
      { CategoryID: 5, CategoryTitle: "charity" },
      { CategoryID: 6, CategoryTitle: "cooking" },
      { CategoryID: 7, CategoryTitle: "relaxation" },
      { CategoryID: 8, CategoryTitle: "music" },
      { CategoryID: 9, CategoryTitle: "busywork" }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
