/**
 * Defines current state of the corresponding blockchain transaction.
 *
 * "pending" - transaction has been request and currently been processed.
 *
 * "built" - transaction body has been build and ready for submission.
 *
 * "submitted" - tx has been submitted to the network.
 *
 * "applied" - transaction has been included into the block with sufficient
 * number of confirmations (final state).
 *
 * "failed" - transaction failed to complete. Refer to failure_reason for
 * details (final state).
 */
export enum TRANSACTION_STATES {
  pending = 'pending',
  applied = 'applied',
  built = 'built',
  submitted = 'submitted',
  failed = 'failed',
}
