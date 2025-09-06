/**
 * Database setup script for GOV.UK Prototype Builder
 * This script initializes the SQLite database and creates the necessary tables
 */

const fs = require('fs')
const path = require('path')

// eslint-disable-next-line import/no-unresolved
const sqlite3 = require('sqlite3')

const dbPath = path.join(__dirname, '..', 'database', 'prototypes.db')
const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql')

console.log('🗄️  Setting up GOV.UK Prototype Builder database...')

try {
  // Ensure database directory exists
  const dbDir = path.dirname(dbPath)
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true })
    console.log('✅ Created database directory')
  }

  // Initialize database
  const db = new sqlite3.Database(dbPath)
  console.log('✅ Connected to SQLite database')

  // Enable foreign keys
  db.run('PRAGMA foreign_keys = ON')
  console.log('✅ Enabled foreign key constraints')

  // Read and execute schema
  if (fs.existsSync(schemaPath)) {
    const schema = fs.readFileSync(schemaPath, 'utf8')
    db.exec(schema)
    console.log('✅ Database schema initialized')
  } else {
    const error = new Error(`Schema file not found: ${schemaPath}`)
    console.error('❌', error.message)
    throw error
  }

  // Test database connection
  db.all('SELECT name FROM sqlite_master WHERE type="table"', (err, result) => {
    if (err) {
      throw err
    }
    console.log(
      '✅ Database tables created:',
      result.map((r) => r.name).join(', ')
    )

    db.close()
    console.log('🎉 Database setup completed successfully!')
    console.log(`📁 Database location: ${dbPath}`)
  })
} catch (error) {
  console.error('❌ Database setup failed:', error.message)
  throw error
}
