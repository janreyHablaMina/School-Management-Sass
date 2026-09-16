const fs = require('fs');
const path = require('path');

// 1. AnnouncementsPanel.tsx
let f = 'src/components/Teacher/Dashboard/sections/AnnouncementsPanel.tsx';
let content = fs.readFileSync(f, 'utf8');
content = content.replace(/title="Pinned"/, 'aria-label="Pinned"');
fs.writeFileSync(f, content);

// 2. LessonPreviewModal.tsx
f = 'src/components/Teacher/Lessons/components/LessonPreviewModal.tsx';
content = fs.readFileSync(f, 'utf8');
content = content.replace(/from '\.\.\/\.\.\/shared\/TeacherModal'/, "from '@/components/ui/shared'");
fs.writeFileSync(f, content);

// 3. LessonsTable.tsx
f = 'src/components/Teacher/Lessons/LessonsTable.tsx';
content = fs.readFileSync(f, 'utf8');
content = content.replace(/accent: 'neutral'/g, "accent: 'default'");
fs.writeFileSync(f, content);

// 4. LessonsView.tsx
f = 'src/components/Teacher/Lessons/LessonsView.tsx';
content = fs.readFileSync(f, 'utf8');
content = content.replace(/tabsAriaLabel="[^"]+"/g, '');
fs.writeFileSync(f, content);

// 5. Lessons/utils.ts
f = 'src/components/Teacher/Lessons/utils.ts';
content = fs.readFileSync(f, 'utf8');
content = content.replace(/export const lessonTypeIcon: Record<LessonType, string> = {/g, "export const lessonTypeIcon: Record<string, string> = {");
content = content.replace(/export const lessonTypeAccent: Record<LessonType, string> = {/g, "export const lessonTypeAccent: Record<string, string> = {");
fs.writeFileSync(f, content);

// 6. ClassFormModal.tsx
f = 'src/components/Teacher/MyClasses/components/ClassFormModal.tsx';
content = fs.readFileSync(f, 'utf8');
content = content.replace(/coverImage: ''/g, ""); // if there's coverImage: '' we delete it or just fix the Partial.
// Better: just remove the whole coverImage line if it exists.
content = content.replace(/,\s*coverImage:\s*''/g, "");
fs.writeFileSync(f, content);

// 7. MyClassesView.tsx
f = 'src/components/Teacher/MyClasses/MyClassesView.tsx';
content = fs.readFileSync(f, 'utf8');
content = content.replace(/highlightedClassId=\{[^\}]+\}/g, "");
fs.writeFileSync(f, content);

// 8. StudentFormModal.tsx
f = 'src/components/Teacher/Students/components/StudentFormModal.tsx';
content = fs.readFileSync(f, 'utf8');
content = content.replace(/useRef<HTMLInputElement \| null>/g, "useRef<HTMLInputElement>");
fs.writeFileSync(f, content);

// 9. StudentsTable.tsx
f = 'src/components/Teacher/Students/StudentsTable.tsx';
content = fs.readFileSync(f, 'utf8');
content = content.replace(/onBulkArchive,/g, "onBulkArchive?: () => void;");
fs.writeFileSync(f, content);

console.log("Fixed other typescript errors");
