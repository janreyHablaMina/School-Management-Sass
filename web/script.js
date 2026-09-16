const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Files to move to lib/hooks
const hooks = [
  'useColumnSort.ts',
  'usePagedList.ts',
  'useRowSelection.ts',
  'useLockWorkspaceScroll.ts',
  'useEscapeKey.ts',
  'resourceHelpers.ts'
];

// Files to rename
const renameMap = {
  'TeacherModal.tsx': 'Modal.tsx',
  'teacherModal.module.css': 'modal.module.css',
  'TeacherToast.tsx': 'Toast.tsx',
  'teacherToast.module.css': 'toast.module.css'
};

const teacherSharedDir = path.join(__dirname, 'src', 'components', 'Teacher', 'shared');
const sharedUiDir = path.join(__dirname, 'src', 'components', 'ui', 'shared');
const hooksDir = path.join(__dirname, 'src', 'lib', 'hooks');

if (!fs.existsSync(sharedUiDir)) fs.mkdirSync(sharedUiDir, { recursive: true });
if (!fs.existsSync(hooksDir)) fs.mkdirSync(hooksDir, { recursive: true });

// Read all files in Teacher/shared
const files = fs.readdirSync(teacherSharedDir);

for (const file of files) {
  const oldPath = path.join(teacherSharedDir, file);
  
  // Skip if it's a directory (just in case, but usually none)
  if (fs.statSync(oldPath).isDirectory()) continue;

  let newFileName = file;
  if (renameMap[file]) {
    newFileName = renameMap[file];
  }

  let newPath;
  if (hooks.includes(file)) {
    newPath = path.join(hooksDir, newFileName);
  } else {
    newPath = path.join(sharedUiDir, newFileName);
  }

  execSync(`git mv "${oldPath}" "${newPath}"`);
}
console.log("Moved files successfully.");
