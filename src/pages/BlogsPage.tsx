import { PageHeader } from "../components/layout/PageHeader";
import { FolderBlock } from "../components/blogs/FolderBlock";
import { blogFolders } from "../data/blogs";

export default function BlogsPage() {
  return (
    <>
      <PageHeader title="Blogs" lede="Writing, organized into folders. Open one to browse its posts." />
      <div className="container-page pb-24">
        {blogFolders.length === 0 ? (
          <p className="text-ink-soft">Add folders in src/data/blogs.ts and they will show up here.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogFolders.map((folder) => (
              <FolderBlock key={folder.id} folder={folder} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
