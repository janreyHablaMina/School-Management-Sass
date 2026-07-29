import React from 'react';
import styles from '../../studentProfile.module.css';
import { User, Shield, Phone, Heart, MessageSquare, Mail, Bell, Edit2, MoreVertical, Plus } from 'lucide-react';
import { 
  PARENTS_GUARDIANS, 
  LINKED_ACCOUNTS, 
  EMERGENCY_CONTACTS, 
  AUTHORIZED_PICKUP, 
  MEDICAL_NOTES, 
  COMMUNICATION_PREFS 
} from '../../../../../../lib/mock/studentProfile.mock';

export const ParentGuardianTab: React.FC = () => {
  return (
    <div className={styles.parentGuardianGrid}>
      {/* Left Column */}
      <div className={styles.pgLeftCol}>
        
        {/* Parent & Guardian Information */}
        <div className={styles.infoCard}>
          <div className={styles.infoCardHeader}>
            <span className={styles.infoCardTitle}>Parent & Guardian Information</span>
          </div>
          <div className={styles.pgList}>
            {PARENTS_GUARDIANS.map(person => (
              <div key={person.id} className={styles.pgCardItem}>
                <div className={styles.pgAvatarCol}>
                  <div className={styles.pgAvatarIconBox} style={{
                    background: person.isLegalGuardian ? 'rgba(92, 199, 137, 0.1)' : 'rgba(132, 169, 255, 0.1)',
                    color: person.isLegalGuardian ? '#5cc789' : '#84a9ff',
                    borderColor: person.isLegalGuardian ? 'rgba(92, 199, 137, 0.2)' : 'rgba(132, 169, 255, 0.2)'
                  }}>
                    {person.isLegalGuardian ? <Shield size={20} /> : <User size={20} />}
                  </div>
                  <span className={styles.pgAvatarLabel}>
                    {person.isLegalGuardian ? 'Legal Guardian\n(if applicable)' : person.relationship}
                  </span>
                </div>
                
                <div className={styles.pgDetailsGrid}>
                  <div className={styles.detailRow}>
                    <span className={styles.rowLabel}>Name</span>
                    <span className={styles.rowValue}>{person.name}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.rowLabel}>Mobile Number</span>
                    <span className={styles.rowValue}>{person.mobile}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.rowLabel}>Relationship</span>
                    <span className={styles.rowValue}>{person.relationship}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.rowLabel}>Email</span>
                    <span className={styles.rowValue}>{person.email}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.rowLabel}>Occupation</span>
                    <span className={styles.rowValue}>{person.occupation}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.rowLabel}>Address</span>
                    <span className={styles.rowValue}>{person.address}</span>
                  </div>
                </div>

                <div className={styles.pgActionCol}>
                  <button className={styles.pgEditBtn}>
                    <Edit2 size={14} /> Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Linked Parent Accounts */}
        <div className={styles.infoCard}>
          <div className={styles.infoCardHeader}>
            <span className={styles.infoCardTitle}>Linked Parent Accounts</span>
          </div>
          <div className={styles.tableContainer} style={{ marginTop: '1rem', border: 'none', background: 'transparent' }}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>PARENT/GUARDIAN NAME</th>
                  <th>RELATIONSHIP</th>
                  <th>MOBILE NUMBER</th>
                  <th>ACCOUNT STATUS</th>
                  <th>LAST LOGIN</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {LINKED_ACCOUNTS.map(account => (
                  <tr key={account.id}>
                    <td>{account.name}</td>
                    <td style={{ color: 'rgba(240, 239, 237, 0.6)' }}>{account.relationship}</td>
                    <td style={{ color: 'rgba(240, 239, 237, 0.6)' }}>{account.mobile}</td>
                    <td>
                      <span className={styles.statusBadge}>{account.status}</span>
                    </td>
                    <td style={{ color: 'rgba(240, 239, 237, 0.6)', whiteSpace: 'pre-line', fontSize: '0.8rem' }}>{account.lastLogin}</td>
                    <td>
                      <button className={styles.iconBtn}><MoreVertical size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <button className={styles.pgEditBtn} style={{ color: '#b68eff', borderColor: 'rgba(182, 142, 255, 0.3)' }}>
              <Plus size={16} /> Invite Parent / Guardian
            </button>
          </div>
        </div>

      </div>

      {/* Right Column */}
      <div className={styles.pgRightCol}>
        
        <div className={styles.pgTwoCardGrid}>
          {/* Emergency Contact */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader}>
              <span className={styles.infoCardTitle}>Emergency Contact</span>
            </div>
            <div className={styles.pgSideList}>
              {EMERGENCY_CONTACTS.map(contact => (
                <div key={contact.id} className={styles.sideCardItem}>
                  <div className={styles.sideIconBox} style={{ background: 'rgba(182, 142, 255, 0.1)', color: '#b68eff' }}>
                    <Phone size={16} />
                  </div>
                  <div className={styles.sideContentFlex}>
                    <div className={styles.sideLabelCol}>
                      <span className={styles.sideMainLabel}>{contact.label}</span>
                      <span className={styles.sideSubLabel}>{contact.priority}</span>
                    </div>
                    <div className={styles.sideValueCol}>
                      <span className={styles.sideMainValue}>{contact.name} ({contact.relationship})</span>
                      <span className={styles.sideSubValue}>{contact.mobile}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Authorized Pick-up Persons */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader}>
              <span className={styles.infoCardTitle}>Authorized Pick-up Persons</span>
              <span className={styles.countBadge}>{AUTHORIZED_PICKUP.length}</span>
            </div>
            <div className={styles.pgSideList}>
              {AUTHORIZED_PICKUP.map(person => (
                <div key={person.id} className={styles.sideCardItem}>
                  <div className={styles.sideIconBox} style={{ background: 'rgba(92, 199, 137, 0.1)', color: '#5cc789' }}>
                    <User size={16} />
                  </div>
                  <div className={styles.sideContentFlex}>
                    <div className={styles.sideValueCol}>
                      <span className={styles.sideMainValue}>{person.name} ({person.relationship})</span>
                      <span className={styles.sideSubValue}>{person.mobile}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.pgTwoCardGrid}>
          {/* Communication Preferences */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader}>
              <span className={styles.infoCardTitle}>Communication Preferences</span>
            </div>
            <div className={styles.pgSideList}>
              {COMMUNICATION_PREFS.map(pref => {
                const Icon = pref.icon === 'message-square' ? MessageSquare : pref.icon === 'mail' ? Mail : Bell;
                const iconColor = pref.icon === 'message-square' ? '#5cc789' : pref.icon === 'mail' ? '#84a9ff' : '#b68eff';
                
                return (
                  <div key={pref.id} className={styles.sideCardItem}>
                    <div className={styles.sideIconBox} style={{ background: `rgba(${iconColor === '#5cc789' ? '92, 199, 137' : iconColor === '#84a9ff' ? '132, 169, 255' : '182, 142, 255'}, 0.1)`, color: iconColor }}>
                      <Icon size={16} />
                    </div>
                    <div className={styles.sideContentFlex}>
                      <div className={styles.sideLabelCol} style={{ flex: 1 }}>
                        <span className={styles.sideMainValue}>{pref.type}</span>
                        <span className={styles.sideSubLabel}>{pref.description}</span>
                      </div>
                      <div className={styles.sideActionCol}>
                        <span className={styles.statusBadge} style={{ fontSize: '0.7rem' }}>Enabled</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className={styles.pgEditBtn}>
                <Edit2 size={14} /> Edit Preferences
              </button>
            </div>
          </div>

          {/* Medical Notes */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardHeader} style={{ justifyContent: 'space-between' }}>
              <span className={styles.infoCardTitle}>Medical Notes</span>
              <button className={styles.pgEditBtn}><Edit2 size={14} /> Edit</button>
            </div>
            <div className={styles.sideCardItem} style={{ borderBottom: 'none', paddingBottom: 0 }}>
              <div className={styles.sideIconBox} style={{ background: 'rgba(182, 142, 255, 0.1)', color: '#b68eff' }}>
                <Heart size={16} />
              </div>
              <div className={styles.sideContentFlex}>
                <div className={styles.sideValueCol}>
                  <span className={styles.sideMainLabel} style={{ color: '#f0efed' }}>Medical Notes</span>
                  <span className={styles.sideSubLabel} style={{ whiteSpace: 'pre-line', marginTop: '0.2rem' }}>
                    {MEDICAL_NOTES.text}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
