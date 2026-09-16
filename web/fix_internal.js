const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const uiDir = path.join(__dirname, 'src', 'components', 'ui', 'shared');

// Files to check in uiDir
const files = fs.readdirSync(uiDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

// Known hooks
const hooks = [
  'useColumnSort',
  'sortByConfig',
  'sortWithColumnOverride',
  'bindColumnSort',
  'SortConfig',
  'SortDirection',
  'useRowSelection',
  'usePagedList',
  'useLockWorkspaceScroll',
  'useEscapeKey',
  'accentFromMap',
  'archiveRowById',
  'archiveRowsByIds',
  'deleteRowById',
  'deleteRowsByIds',
  'matchesAllOrExact',
  'matchesSearch',
  'rateBarColor',
  'sortByCreatedOrTitle'
];

for (const file of files) {
  const filePath = path.join(uiDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace internal hook imports like `import { useEscapeKey } from './useEscapeKey';`
  // Actually, they might be importing multiple things.
  // We can just regex replace `./hookName` with `@/lib/hooks`
  content = content.replace(/from\s+['"]\.\/useEscapeKey['"]/g, "from '@/lib/hooks'");
  content = content.replace(/from\s+['"]\.\/useLockWorkspaceScroll['"]/g, "from '@/lib/hooks'");
  content = content.replace(/from\s+['"]\.\/useColumnSort['"]/g, "from '@/lib/hooks'");
  content = content.replace(/from\s+['"]\.\/useRowSelection['"]/g, "from '@/lib/hooks'");
  content = content.replace(/from\s+['"]\.\/usePagedList['"]/g, "from '@/lib/hooks'");
  content = content.replace(/from\s+['"]\.\/resourceHelpers['"]/g, "from '@/lib/hooks'");

  // Fix CSS module renames
  content = content.replace(/teacherModal\.module\.css/g, "modal.module.css");
  content = content.replace(/teacherToast\.module\.css/g, "toast.module.css");

  // Fix component renames in code
  if (file === 'Modal.tsx') {
    content = content.replace(/TeacherModal/g, "Modal");
  }
  if (file === 'Toast.tsx') {
    content = content.replace(/TeacherToast/g, "Toast");
  }

  // ConfirmActionModal uses TeacherModal
  if (file === 'ConfirmActionModal.tsx') {
    content = content.replace(/TeacherModal/g, "Modal");
    content = content.replace(/\.\/TeacherModal/g, "./Modal");
  }

  fs.writeFileSync(filePath, content);
}
console.log("Fixed internal UI imports");
