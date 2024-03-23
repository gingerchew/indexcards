import { column, defineDb, defineTable, NOW } from 'astro:db';

const User = defineTable({
  columns: { 
    id: column.text({ primaryKey: true }),
    username: column.text(),
    lastLoggedIn: column.number(),
    accountCreatedOn: column.number({ default: NOW }),
  }
})


const FlashCards = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    config: column.json(),
    cardCreated: column.date({ default: NOW }),
    by: column.text({ references: () => User.columns.id }),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    User,
    FlashCards
  }
});
