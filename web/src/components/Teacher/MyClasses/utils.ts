import { teacherLessonsPageMock } from '@/lib/mock/teacherLessons.mock';
import { teacherStudentsPageMock } from '@/lib/mock/teacherStudents.mock';
import type { MyClassRow } from '@/types/myClasses';
import type { TeacherLessonRow } from '@/types/teacherLessons';
import type { TeacherStudentRow } from '@/types/teacherStudents';

export function rosterForClass(cls: MyClassRow, limit = 5): TeacherStudentRow[] {
  const students = teacherStudentsPageMock.students;
  const matched = students.filter(
    (student) =>
      student.classLabel === cls.gradeSection && student.subject === cls.subject,
  );
  const roster = matched.length
    ? matched
    : students.filter((student) => student.classLabel === cls.gradeSection);
  return roster.slice(0, limit);
}

export function lessonsForClass(cls: MyClassRow, limit = 3): TeacherLessonRow[] {
  const lessons = teacherLessonsPageMock.lessons;
  const exact = lessons.filter(
    (lesson) => lesson.classLabel === cls.gradeSection && lesson.subject === cls.subject,
  );
  if (exact.length > 0) return exact.slice(0, limit);

  return lessons
    .filter(
      (lesson) =>
        lesson.subject === cls.subject && lesson.classLabel.includes(cls.gradeLevel),
    )
    .slice(0, limit);
}
