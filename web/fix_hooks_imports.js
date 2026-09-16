const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

// Find all files importing from ui/shared
const res = execSync('git grep -l "@/components/ui/shared"').toString().split('\n').filter(Boolean);

for (const file of res) {
  let content = fs.readFileSync(file, 'utf8');

  // We will do a generic approach: look for any import from ui/shared and separate it.
  const regex = /import\s+{([^}]+)}\s+from\s+['"]@\/components\/ui\/shared['"];/g;
  content = content.replace(regex, (match, importsStr) => {
    const items = importsStr.split(',').map(s => s.trim()).filter(Boolean);
    const uiItems = [];
    const hookItems = [];
    
    for (const item of items) {
      const cleanItem = item.replace(/^type\s+/, '').split(' as ')[0].trim();
      if (hooks.includes(cleanItem)) {
        hookItems.push(item);
      } else {
        uiItems.push(item);
      }
    }
    
    let result = '';
    if (uiItems.length > 0) {
      result += `import { ${uiItems.join(', ')} } from '@/components/ui/shared';\n`;
    }
    if (hookItems.length > 0) {
      result += `import { ${hookItems.join(', ')} } from '@/lib/hooks';\n`;
    }
    
    return result.trim() + ';';
  });

  fs.writeFileSync(file, content);
}
console.log("Fixed hooks imports from ui/shared");
