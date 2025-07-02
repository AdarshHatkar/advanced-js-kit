# Local Development Guide for advanced-js-kit

## Using the Package with File Dependency

When using `"advanced-js-kit": "file:C:/primexopRepos/advanced-js-kit"` in your project, follow these steps to ensure proper auto-completion:

### 1. **Ensure Package is Built**
```bash
cd C:/primexopRepos/advanced-js-kit
npm run build
```

### 2. **Update Your Project's tsconfig.json**
Add path mapping to help TypeScript resolve the package:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "advanced-js-kit": ["./node_modules/advanced-js-kit/dist/index.d.ts"],
      "advanced-js-kit/*": ["./node_modules/advanced-js-kit/dist/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### 3. **Install Dependencies**
```bash
npm install
```

### 4. **Restart VS Code TypeScript Service**
- Press `Ctrl+Shift+P`
- Type "TypeScript: Restart TS Server"
- Press Enter

### 5. **Test Auto-completion**
Create a test file:

```typescript
import { chunk, capitalize, clamp } from 'advanced-js-kit';

// Should show auto-completion
const result1 = chunk([1, 2, 3, 4, 5], 2);
const result2 = capitalize('hello world');  
const result3 = clamp(15, 0, 10);
```

### 6. **Alternative: Use Workspace References**
If path mapping doesn't work, you can also use TypeScript project references:

```json
{
  "references": [
    { "path": "../advanced-js-kit" }
  ]
}
```

### Troubleshooting

If auto-completion still doesn't work:

1. **Check node_modules**: Ensure the symlink was created properly
2. **Clear VS Code cache**: Close VS Code, delete `.vscode` folder, restart
3. **Rebuild package**: Run `npm run build` in the advanced-js-kit directory
4. **Check TypeScript version**: Ensure you're using TypeScript 4.7+

### Example Usage

```typescript
// Main import - gets auto-completion
import { chunk, capitalize, clamp } from 'advanced-js-kit';

// Tree-shaking imports - also gets auto-completion  
import { chunk } from 'advanced-js-kit/array/chunk';
import { capitalize } from 'advanced-js-kit/string/capitalize';
import { clamp } from 'advanced-js-kit/number/clamp';
```
