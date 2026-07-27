import React, { useState } from 'react';
import styles from '../studentProfile.module.css';
import { DOCUMENT_STATS, DOCUMENT_LIST } from './mockData';
import { MoreHorizontal, Search, Download, Trash2, Eye } from 'lucide-react';

export const DocumentsTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  // Filter logic
  const filteredDocuments = DOCUMENT_LIST.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || doc.category === categoryFilter;
    const matchesStatus = statusFilter === 'All Statuses' || doc.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['All Categories', ...Array.from(new Set(DOCUMENT_LIST.map(d => d.category)))];
  const statuses = ['All Statuses', 'Verified', 'Pending', 'Missing'];

  return (
    <div className={styles.documentsGrid}>
      {/* Top Stats */}
      <div className={styles.statsRow}>
        {Object.entries(DOCUMENT_STATS).map(([key, stat]) => (
          <div key={key} className={styles.statBox}>
            <div className={styles.statHeader}>
              <div 
                className={styles.statIconSmall}
                style={{ backgroundColor: stat.iconBg, color: stat.iconColor }}
              >
                {stat.icon}
              </div>
              <div className={styles.statTitle}>{stat.label}</div>
            </div>
            <div className={styles.statValLarge}>{stat.value}</div>
            <div className={styles.statSub}>{stat.subText}</div>
          </div>
        ))}
      </div>

      <div className={styles.documentsMainLayout}>
        <div className={styles.documentsContent}>
          {/* Filters */}
          <div className={styles.documentsFilters}>
            <select 
              className={styles.filterSelect}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            
            <select 
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statuses.map(stat => <option key={stat} value={stat}>{stat}</option>)}
            </select>
            
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={16} />
              <input 
                type="text" 
                placeholder="Search documents..." 
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>DOCUMENT NAME</th>
                  <th>CATEGORY</th>
                  <th>UPLOADED DATE</th>
                  <th>STATUS</th>
                  <th>UPLOADED BY</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map(doc => (
                  <tr key={doc.id}>
                    <td>
                      <div className={styles.docNameCell}>
                        <div className={styles.docIconBox}>{doc.icon}</div>
                        <span className={styles.docNameText}>{doc.name}</span>
                      </div>
                    </td>
                    <td>
                      <span 
                        className={styles.categoryBadge}
                        style={{ color: doc.categoryColor, backgroundColor: doc.categoryBg }}
                      >
                        {doc.category}
                      </span>
                    </td>
                    <td>
                      <div className={styles.dateCell}>
                        {doc.uploadedDate.split('\n').map((line, i) => (
                          <div key={i} className={i === 0 ? styles.dateMain : styles.dateSub}>{line}</div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.statusBadgeDoc} ${styles[`status${doc.status}`]}`}>
                        {doc.status === 'Verified' && '✔️'}
                        {doc.status === 'Pending' && '🕒'}
                        {doc.status === 'Missing' && '❌'}
                        {' '} {doc.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.uploadedByCell}>
                        <div className={styles.uploaderName}>{doc.uploadedBy}</div>
                        {doc.uploadedByRole && <div className={styles.uploaderRole}>{doc.uploadedByRole}</div>}
                      </div>
                    </td>
                    <td>
                      <button className={styles.actionBtn}>
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.tableFooter}>
              Showing {filteredDocuments.length > 0 ? 1 : 0} to {filteredDocuments.length} of {DOCUMENT_LIST.length} documents
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={styles.documentsSidebar}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarCardTitle}>Documents Completion</h3>
            
            <div className={styles.progressCircleContainer}>
              <svg className={styles.progressCircle} viewBox="0 0 100 100">
                <circle className={styles.progressBackground} cx="50" cy="50" r="40" />
                <circle 
                  className={styles.progressForeground} 
                  cx="50" cy="50" r="40" 
                  strokeDasharray="251.2" 
                  strokeDashoffset={251.2 * (1 - 8/10)} 
                />
              </svg>
              <div className={styles.progressContent}>
                <div className={styles.progressLabel}>Rank</div>
                <div className={styles.progressValue}>8 / 10</div>
                <div className={styles.progressSub}>Documents<br/>Submitted</div>
              </div>
            </div>
            
            <div className={styles.progressBarWrapper}>
              <div className={styles.progressTextContainer}>
                <span className={styles.progressTextBold}>80% Completed</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '80%' }}></div>
              </div>
              <div className={styles.progressSubtext}>
                Please complete all required documents.
              </div>
            </div>
          </div>

          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarCardTitle}>Missing Requirements</h3>
            <div className={styles.missingWarningBox}>
              <div className={styles.missingWarningIcon}>📄</div>
              <div className={styles.missingWarningText}>
                <strong>1 document missing</strong>
                <span>Submit the required document to complete your profile.</span>
              </div>
            </div>
            
            <ul className={styles.missingList}>
              <li className={styles.missingItem}>
                <span className={styles.missingDot}></span>
                Certificate of Completion (JHS)
              </li>
            </ul>
            
            <button className={styles.viewRequirementsBtn}>
              View Requirements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
