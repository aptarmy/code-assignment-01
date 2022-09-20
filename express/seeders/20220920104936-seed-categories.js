'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Categories', [
      { CategoryID: 1, Title: "education" },
      { CategoryID: 2, Title: "recreational" },
      { CategoryID: 3, Title: "social" },
      { CategoryID: 4, Title: "diy" },
      { CategoryID: 5, Title: "charity" },
      { CategoryID: 6, Title: "cooking" },
      { CategoryID: 7, Title: "relaxation" },
      { CategoryID: 8, Title: "music" },
      { CategoryID: 9, Title: "busywork" }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
