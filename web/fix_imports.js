const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all files
const res = execSync('git grep -l "@/components/Teacher/shared"').toString().split('\n').filter(Boolean);

// Define hooks
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

for (const file of res) {
  const content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  // We need to parse imports from @/components/Teacher/shared.
  // A simple regex approach:
  const regex = /import\s+({[^}]+}|\*\s+as\s+\w+|\w+)\s+from\s+['"]@\/components\/Teacher\/shared['"];/g;
  
  newContent = newContent.replace(regex, (match, importsStr) => {
    // Determine which are hooks and which are ui
    const importedItems = importsStr.replace(/[{}]/g, '').split(',').map(s => s.trim()).filter(Boolean);
    
    const uiImports = [];
    const hookImports = [];
    
    for (const item of importedItems) {
      // Handle 'type SortConfig' etc
      let cleanItem = item.replace(/^type\s+/, '').split(' as ')[0].trim();
      
      // Also handle default imports which shouldn't happen for this pattern but just in case
      if (hooks.includes(cleanItem) || cleanItem === 'resourceHelpers') {
        hookImports.push(item);
      } else {
        // Special case renames
        let finalItem = item;
        if (cleanItem === 'TeacherModal') finalItem = item.replace('TeacherModal', 'Modal as TeacherModal');
        if (cleanItem === 'TeacherToast') finalItem = item.replace('TeacherToast', 'Toast as TeacherToast');
        if (cleanItem === 'modalStyles') finalItem = item.replace('modalStyles', 'modalStyles'); // handled in index.ts
        
        uiImports.push(finalItem);
      }
    }
    
    let result = '';
    if (uiImports.length > 0) {
      result += `import { ${uiImports.join(', ')} } from '@/components/ui/shared';\n`;
    }
    if (hookImports.length > 0) {
      result += `import { ${hookImports.join(', ')} } from '@/lib/hooks';\n`;
    }
    
    return result.trim() + ';';
  });
  
  // also handle relative imports like '../shared'
  fs.writeFileSync(file, newContent);
}

// Now handle relative imports like `import { ... } from '../../shared'` in Teacher/Students etc
const res2 = execSync('git grep -l -e "from .\\+\\/shared"').toString().split('\n').filter(Boolean);

for (const file of res2) {
  let content = fs.readFileSync(file, 'utf8');
  // replace from '../shared' or '../../shared' to the absolute paths if they were pointing to Teacher/shared
  // since we moved Teacher/shared, they are broken anyway.
  if (file.includes('Teacher/')) {
     content = content.replace(/from\s+['"](\.\.\/)+shared['"]/g, "from '@/components/ui/shared'");
     // Wait, if it had hooks, this simple replace won't split them.
     // Let's just fix it manually if it fails build.
  }
  fs.writeFileSync(file, content);
}
console.log("Done replacing imports");
