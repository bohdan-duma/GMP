/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(
      `CREATE TYPE group_permission AS ENUM ('read', 'write', 'delete', 'share', 'upload_files');`
    );
    await queryInterface.sequelize.query(
      `CREATE TABLE groups (id uuid not null default gen_random_uuid(), name text not null, permissions group_permission[]);`
    );
    await queryInterface.sequelize.query(
      `ALTER TABLE groups ADD CONSTRAINT pk_groups_id PRIMARY KEY (id);`
    );
    await queryInterface.sequelize.query(
      `CREATE TABLE user_group (id uuid not null default gen_random_uuid(), user_id uuid not null, group_id uuid not null);`
    );
    await queryInterface.sequelize.query(
      `ALTER TABLE user_group ADD CONSTRAINT pk_user_group_id PRIMARY KEY (id);`
    );
    await queryInterface.sequelize.query(
      `ALTER TABLE user_group ADD CONSTRAINT fk_user_group_user_id FOREIGN KEY (user_id) REFERENCES "users" (id);`
    );
    await queryInterface.sequelize.query(
      `ALTER TABLE user_group ADD CONSTRAINT fk_user_group_group_id FOREIGN KEY (group_id) REFERENCES "groups" (id) on delete cascade;`
    );
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(`DROP TYPE user_group;`);
    await queryInterface.sequelize.query(`DROP TABLE groups;`);
    await queryInterface.sequelize.query(`DROP TYPE group_permission;`);
  },
};
