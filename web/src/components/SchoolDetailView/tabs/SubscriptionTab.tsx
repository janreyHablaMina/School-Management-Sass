import React from 'react';
import styles from '../SchoolDetailView.module.css';

export const SubscriptionTab = ({
  school,
  details,
}: {
  school: any;
  details: any;
}) => {
  return (
    <section className={styles.detailBodyGrid}>
      {/* 1. Current Subscription Card (span 7) */}
      <div className={`${styles.detailCard} ${styles.colSpan8}`} style={{ gridColumn: 'span 7' }}>
        <div className={styles.detailCardHeader}>
          <h3 className={styles.detailCardTitle}>Current Subscription</h3>
          <span className="status-badge active">Active</span>
        </div>
        <div className={styles.subscriptionSplit}>
          <div className={styles.subCardBadge}>
            <svg className={styles.badgeCrown} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'url(#chalk-wobble)' }}>
              <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" fill="rgba(245, 200, 66, 0.1)"/>
              <path d="M3 20h18"/>
            </svg>
            <h4 className={styles.badgePlanTitle}>School Plan</h4>
            <span className={styles.badgePlanSub}>Up to 500 students</span>
            <span className={styles.badgePlanPrice}>₱2,999<span className={styles.badgePlanUnit}>/month</span></span>
          </div>
          <div className={styles.infoList} style={{ flex: 1 }}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Status</span>
              <span className={styles.infoValue} style={{ color: '#4df58a', fontWeight: 'bold' }}>Active</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Billing Cycle</span>
              <span className={styles.infoValue}>Monthly</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Current Period</span>
              <span className={styles.infoValue}>May 31, 2025 – Jun 30, 2025</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Renewal Date</span>
              <span className={styles.infoValue}>Jun 30, 2025 <span style={{ color: '#4df58a' }}>(30 days left)</span></span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Monthly Fee</span>
              <span className={styles.infoValue}>₱3,999 <span style={{ fontSize: '0.7rem', color: 'rgba(240, 239, 237, 0.4)' }}>(incl. Add-ons)</span></span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Payment Method</span>
              <span className={styles.infoValue}>💳 MasterCard •••• 4242</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Last Payment</span>
              <span className={styles.infoValue}>May 31, 2025 <span className="status-badge active" style={{ fontSize: '0.65rem', padding: '1px 5px', marginLeft: '0.4rem' }}>Paid</span></span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Next Payment</span>
              <span className={styles.infoValue}>Jun 30, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Subscription Usage Card (span 5) */}
      <div className={`${styles.detailCard} ${styles.colSpan4}`} style={{ gridColumn: 'span 5' }}>
        <div className={styles.detailCardHeader}>
          <h3 className={styles.detailCardTitle}>Subscription Usage</h3>
          <span className={styles.detailCardLink}>As of May 31, 2025</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '0.5rem' }}>
          <div className={styles.usageProgressRow}>
            <div className={styles.usageRowHeader}>
              <span className={styles.usageRowLabel}>Students</span>
              <span className={styles.usageRowVal}>
                <span style={{ color: '#ff8a8a', fontWeight: 'bold' }}>512</span> / 500
              </span>
              <span className={styles.usageRowPercent} style={{ color: '#ff8a8a' }}>102%</span>
            </div>
            <div className={styles.progressBarOuter}>
              <div className={styles.progressBarInner} style={{ width: '100%', background: '#ff8a8a' }} />
            </div>
          </div>

          <div className={styles.usageProgressRow}>
            <div className={styles.usageRowHeader}>
              <span className={styles.usageRowLabel}>Teachers</span>
              <span className={styles.usageRowVal}>45 / Unlimited</span>
              <span className={styles.usageRowPercent} style={{ color: 'rgba(240, 239, 237, 0.45)' }}>-</span>
            </div>
            <div className={styles.progressBarOuter}>
              <div className={styles.progressBarInner} style={{ width: '35%', background: '#84a9ff' }} />
            </div>
          </div>

          <div className={styles.usageProgressRow}>
            <div className={styles.usageRowHeader}>
              <span className={styles.usageRowLabel}>Parent Accounts</span>
              <span className={styles.usageRowVal}>620 / Unlimited</span>
              <span className={styles.usageRowPercent} style={{ color: 'rgba(240, 239, 237, 0.45)' }}>-</span>
            </div>
            <div className={styles.progressBarOuter}>
              <div className={styles.progressBarInner} style={{ width: '55%', background: '#84a9ff' }} />
            </div>
          </div>

          <div className={styles.usageProgressRow}>
            <div className={styles.usageRowHeader}>
              <span className={styles.usageRowLabel}>AI Credits (Included)</span>
              <span className={styles.usageRowVal}>100 / 100</span>
              <span className={styles.usageRowPercent} style={{ color: '#4df58a' }}>100%</span>
            </div>
            <div className={styles.progressBarOuter}>
              <div className={styles.progressBarInner} style={{ width: '100%', background: '#4df58a' }} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Add-ons & Extras Card (span 8) */}
      <div className={`${styles.detailCard} ${styles.colSpan8}`}>
        <div className={styles.detailCardHeader}>
          <h3 className={styles.detailCardTitle}>Add-ons & Extras</h3>
        </div>
        
        <div className={styles.addonGrid}>
          <div className={styles.addonSubCard}>
            <div className={styles.addonHeader}>
              <div className={styles.addonIconBox}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'url(#chalk-wobble)' }}>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h4 className={styles.addonTitle}>Additional Students</h4>
            </div>
            <p className={styles.addonDesc}>
              You have 1 additional student slot addon package (adds 500 student capacity).
            </p>
            <div className={styles.infoList}>
              <div className={styles.addonMetricRow}>
                <span className={styles.addonMetricLabel}>Total Allowed Students</span>
                <span className={styles.addonMetricVal}>1,000</span>
              </div>
              <div className={styles.addonMetricRow}>
                <span className={styles.addonMetricLabel}>Additional Cost</span>
                <span className={styles.addonMetricVal} style={{ color: '#f5c842' }}>₱1,000 / month</span>
              </div>
            </div>
            <button className="chalk-btn" style={{ padding: '0.4rem', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Manage Additional Students
            </button>
          </div>

          <div className={styles.addonSubCard}>
            <div className={styles.addonHeader}>
              <div className={styles.addonIconBox}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'url(#chalk-wobble)' }}>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              </div>
              <h4 className={styles.addonTitle}>Additional AI Credits</h4>
            </div>
            <p className={styles.addonDesc}>
              You have 200 additional AI credits active for this billing cycle.
            </p>
            <div className={styles.infoList}>
              <div className={styles.addonMetricRow}>
                <span className={styles.addonMetricLabel}>Total Additional Credits</span>
                <span className={styles.addonMetricVal}>200</span>
              </div>
              <div className={styles.addonMetricRow}>
                <span className={styles.addonMetricLabel}>Additional Cost</span>
                <span className={styles.addonMetricVal} style={{ color: '#f5c842' }}>₱398 / month</span>
              </div>
            </div>
            <button className="chalk-btn" style={{ padding: '0.4rem', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Manage AI Credits
            </button>
          </div>
        </div>
      </div>

      {/* 4. Billing Actions Card (span 4) */}
      <div className={`${styles.detailCard} ${styles.colSpan4}`}>
        <div className={styles.detailCardHeader}>
          <h3 className={styles.detailCardTitle}>Billing Actions</h3>
        </div>
        
        <div className={styles.actionList}>
          <div className={styles.actionRow}>
            <div className={styles.actionRowContent}>
              <div className={styles.actionIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </div>
              <div className={styles.actionTextContainer}>
                <span className={styles.actionLabelTitle}>Upgrade / Change Plan</span>
                <span className={styles.actionLabelSub}>Upgrade or downgrade plan</span>
              </div>
            </div>
            <span className={styles.actionChevron}>❯</span>
          </div>

          <div className={styles.actionRow}>
            <div className={styles.actionRowContent}>
              <div className={styles.actionIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              </div>
              <div className={styles.actionTextContainer}>
                <span className={styles.actionLabelTitle}>Update Payment Method</span>
                <span className={styles.actionLabelSub}>Update billing information</span>
              </div>
            </div>
            <span className={styles.actionChevron}>❯</span>
          </div>

          <div className={styles.actionRow}>
            <div className={styles.actionRowContent}>
              <div className={styles.actionIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className={styles.actionTextContainer}>
                <span className={styles.actionLabelTitle}>View Invoices</span>
                <span className={styles.actionLabelSub}>View and download past invoices</span>
              </div>
            </div>
            <span className={styles.actionChevron}>❯</span>
          </div>

          <div className={`${styles.actionRow} ${styles.actionRowDelete}`}>
            <div className={styles.actionRowContent}>
              <div className={styles.actionIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                  <line x1="12" y1="2" x2="12" y2="12" />
                </svg>
              </div>
              <div className={styles.actionTextContainer}>
                <span className={styles.actionLabelTitle} style={{ color: '#ff8a8a' }}>Cancel Subscription</span>
                <span className={styles.actionLabelSub}>Cancel subscription service</span>
              </div>
            </div>
            <span className={styles.actionChevron}>❯</span>
          </div>
        </div>
      </div>

      {/* 5. Subscription History Card (span 8) */}
      <div className={`${styles.detailCard} ${styles.colSpan8}`}>
        <div className={styles.detailCardHeader}>
          <h3 className={styles.detailCardTitle}>Subscription History</h3>
        </div>
        
        <div className={styles.historyTableWrapper}>
          <table className={styles.historyTable}>
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment Method</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.invoiceNum}>INV-2025-00056</td>
                <td>May 31, 2025</td>
                <td style={{ fontWeight: 'bold' }}>₱3,999</td>
                <td><span className="status-badge active" style={{ fontSize: '0.65rem', padding: '1px 5px' }}>Paid</span></td>
                <td>💳 •••• 4242</td>
                <td>
                  <button className={styles.downloadIconBtn}>
                    📥
                  </button>
                </td>
              </tr>
              <tr>
                <td className={styles.invoiceNum}>INV-2025-00045</td>
                <td>Apr 30, 2025</td>
                <td style={{ fontWeight: 'bold' }}>₱3,999</td>
                <td><span className="status-badge active" style={{ fontSize: '0.65rem', padding: '1px 5px' }}>Paid</span></td>
                <td>💳 •••• 4242</td>
                <td>
                  <button className={styles.downloadIconBtn}>
                    📥
                  </button>
                </td>
              </tr>
              <tr>
                <td className={styles.invoiceNum}>INV-2025-00034</td>
                <td>Mar 31, 2025</td>
                <td style={{ fontWeight: 'bold' }}>₱2,999</td>
                <td><span className="status-badge active" style={{ fontSize: '0.65rem', padding: '1px 5px' }}>Paid</span></td>
                <td>💳 •••• 4242</td>
                <td>
                  <button className={styles.downloadIconBtn}>
                    📥
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.historyFooterLink}>
          <span className={styles.detailCardLink} onClick={() => alert('Loading full invoice database...')}>View All Invoices</span>
        </div>
      </div>

      {/* 6. Upcoming Renewal Card (span 4) */}
      <div className={`${styles.detailCard} ${styles.colSpan4}`}>
        <div className={styles.renewalBox}>
          <div className={styles.renewalHeader}>
            <div className={styles.renewalIconBox}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'url(#chalk-wobble)' }}>
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h4 className={styles.renewalTitle}>Upcoming Renewal</h4>
          </div>
          
          <div className={styles.renewalText}>
            Your subscription will renew on:
            <span className={styles.renewalDateVal}>June 30, 2025</span>
          </div>

          <div className={styles.renewalBadgeRow}>
            <span className={styles.renewalWarningBadge}>30 Days Left</span>
            <span className={styles.renewalWarningBadge} style={{ background: 'rgba(255, 138, 138, 0.1)', color: '#ff8a8a' }}>Action Needed</span>
          </div>
        </div>
      </div>
    </section>
  );
};
