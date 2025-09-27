// utils/folderUtils.ts
export const buildFolderTree = (folders: any[]) => {
  const map: Record<string, any> = {};
  const roots: any[] = [];

  folders.forEach(f => {
    map[f._id] = { ...f, children: [] };
  });

  folders.forEach(f => {
    if (f.parent && map[f.parent]) {
      map[f.parent].children.push(map[f._id]);
    } else {
      roots.push(map[f._id]);
    }
  });

  return roots;
};
