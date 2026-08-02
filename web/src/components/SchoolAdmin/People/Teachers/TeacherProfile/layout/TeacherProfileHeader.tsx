import React from 'react';
import { Teacher } from '@/lib/mock/teachers.mock';
import { GenericProfileHeader } from '../../../shared/GenericProfileHeader';

interface TeacherProfileHeaderProps {
  teacher: Teacher;
}

export const TeacherProfileHeader: React.FC<TeacherProfileHeaderProps> = ({ teacher }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <GenericProfileHeader
      name={teacher.name}
      avatar={teacher.avatar}
      initials={getInitials(teacher.name)}
      avatarColor={teacher.departmentColor}
      status={teacher.status}
      statusBg={teacher.statusBg}
      statusColor={teacher.statusColor}
      badgeLabel={`${teacher.status} Teacher`}
      primaryDetails={[
        { label: 'Department', value: teacher.department },
        { label: 'Employee ID', value: teacher.employeeId },
        { label: 'Position', value: teacher.position }
      ]}
      personalInfo={{
        title: 'Personal Information',
        icon: '👤',
        details: [
          { label: 'Date of Birth', value: teacher.dateOfBirth },
          { label: 'Gender', value: teacher.gender },
          { label: 'Civil Status', value: teacher.civilStatus },
          { label: 'Nationality', value: teacher.citizenship },
          { label: 'Languages', value: teacher.languages }
        ]
      }}
      employmentInfo={{
        title: 'Employment Information',
        icon: '💼',
        iconBg: 'rgba(92, 199, 137, 0.1)',
        iconColor: '#5cc789',
        details: [
          { label: 'Date Hired', value: teacher.dateHired },
          { label: 'Employment Type', value: teacher.employmentType },
          { label: 'Education', value: teacher.highestEducation },
          { label: 'Specialization', value: teacher.specialization }
        ]
      }}
    />
  );
};
