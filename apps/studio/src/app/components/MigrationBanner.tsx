'use client';

import { useState, useEffect } from 'react';
import { migrateFromLocalStorage, isMigrationNeeded, clearLocalStorageAfterMigration } from '@/lib/migrate-from-localstorage';

export function MigrationBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [migrationComplete, setMigrationComplete] = useState(false);
  const [migrationError, setMigrationError] = useState<string | null>(null);

  useEffect(() => {
    // Check if migration is needed on component mount
    if (isMigrationNeeded()) {
      setShowBanner(true);
    }
  }, []);

  const handleMigrate = async () => {
    setMigrating(true);
    setMigrationError(null);

    try {
      const result = await migrateFromLocalStorage();
      
      if (result.errors.length > 0) {
        setMigrationError(`Migration completed with ${result.errors.length} errors. ${result.migrated} projects migrated successfully.`);
      } else {
        setMigrationComplete(true);
        clearLocalStorageAfterMigration();
        // Hide banner after 3 seconds
        setTimeout(() => {
          setShowBanner(false);
        }, 3000);
      }
    } catch (error) {
      setMigrationError(`Migration failed: ${error}`);
    } finally {
      setMigrating(false);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-blue-800">
            Database Migration Available
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>
              We've upgraded to a more reliable database system. Your projects are currently stored in browser storage and can be migrated to the new system for better persistence and performance.
            </p>
            {migrationError && (
              <p className="mt-2 text-red-600">
                {migrationError}
              </p>
            )}
            {migrationComplete && (
              <p className="mt-2 text-green-600">
                Migration completed successfully! Your projects are now stored in the database.
              </p>
            )}
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                onClick={handleMigrate}
                disabled={migrating || migrationComplete}
                className={`px-2 py-1.5 rounded-md text-sm font-medium ${
                  migrating || migrationComplete
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
              >
                {migrating ? 'Migrating...' : migrationComplete ? 'Migrated' : 'Migrate Now'}
              </button>
              <button
                onClick={handleDismiss}
                disabled={migrating}
                className="ml-3 px-2 py-1.5 rounded-md text-sm font-medium text-blue-800 hover:bg-blue-100 disabled:opacity-50"
              >
                {migrating ? 'Please wait...' : 'Dismiss'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
